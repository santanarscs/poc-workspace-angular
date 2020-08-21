import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import { DateComponent } from '../date/date.component';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { Subscription } from 'rxjs';

// criar novos componentes
const components = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
};

@Directive({
  selector: '[dynamicField]',
})
export class DynamicFieldDirective implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup;
  @Input() model: any;

  @Output() customEvent = new EventEmitter<any>();

  protected componentRef: ComponentRef<any>;
  protected componentSubscriptions: Subscription[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.createDynamicFormControlComponent();

    // const factory = this.resolver.resolveComponentFactory(
    //   componentMapper[this.field.type]
    // );
    // this.componentRef = this.container.createComponent(factory);
    // this.componentRef.instance.field = this.field;
    // this.componentRef.instance.group = this.group;
  }
  public ngOnDestroy() {
    this.destroyDynamicFormControlComponent();
  }

  private createDynamicFormControlComponent() {
    // this.logger.info('DynamicControlDirective: createDynamicFormControlComponent()');

    if (!components[this.model.type]) {
      const supportedTypes = Object.keys(components).join(', ');
    } else {
      const factory = this.resolver.resolveComponentFactory(
        components[this.model.type]
      );
      this.componentRef = this.viewContainerRef.createComponent(
        factory
      ) as ComponentRef<any>;

      const instance = this.componentRef.instance;

      instance.formGroup = this.formGroup;
      instance.model = this.model;

      if (instance.customEvent !== undefined) {
        this.componentSubscriptions.push(
          instance.customEvent.subscribe((event: any) =>
            this.onCustomEvent(event)
          )
        );
      }
    }
  }

  private destroyDynamicFormControlComponent() {
    if (this.componentRef) {
      this.componentSubscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });

      this.componentSubscriptions = [];
      this.componentRef.destroy();
    }
  }
  onCustomEvent(event: any): void {
    this.customEvent.emit(event);
  }
}
