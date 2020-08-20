import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
