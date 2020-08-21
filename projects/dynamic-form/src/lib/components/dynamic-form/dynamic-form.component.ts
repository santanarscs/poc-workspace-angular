import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FieldConfig, Validator } from '../../field.interface';
@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  @Input() formGroup: FormGroup;

  // tslint:disable-next-line:no-input-rename
  @Input('model') formModel: any;

  @Input() autocomplete: string;
  @Input() className: string;

  @Output() customEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  public onCustomEvent(event: any) {
    this.customEvent.emit(event);
  }
}
