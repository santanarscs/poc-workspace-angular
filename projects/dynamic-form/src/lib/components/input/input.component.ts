import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';
@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() model: any;

  @Output() customEvent = new EventEmitter<any>();

  @HostBinding('class') elementClass;
  constructor() {}

  ngOnInit(): void {
    this.elementClass = this.model.gridItemClass;
  }
  public iconSuffixClickHandler() {
    this.customEvent.emit({
      type: 'click',
      id: this.model.id,
      directive: 'matSuffix',
      name: this.model.suffixIconName,
    });
  }
}
