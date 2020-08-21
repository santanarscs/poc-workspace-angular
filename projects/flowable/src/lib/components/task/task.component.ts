import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

// import { DynamicFormModel } from 'dynamic-forms';

import { TasksService } from '../../services/tasks/tasks.service';
import { DynamicFormService } from 'dynamic-form';

@Component({
  selector: 'flow-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnChanges {
  @Input() task: any;
  @Output() completeEvent = new EventEmitter<any>();
  public taskFormGroup: FormGroup;
  public taskModel: any;
  constructor(
    private service: TasksService,
    private dynamicFormService: DynamicFormService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.taskModel = null;
    this.taskFormGroup = null;
    if (this.task && this.task.formKey) {
      this.createForm();
    }
  }

  async createForm(): Promise<void> {
    // criar metodos em dynamic form
    const processDefinitionData = await this.service.getFormParameters(
      this.task.processDefinitionId
    );
    const { id: formDefinitionId } = processDefinitionData.find(
      processDefinition => processDefinition.key === this.task.formKey
    );
    const formData = await this.service.getFormItems(formDefinitionId);
    // this.taskModel = await this.dynamicFormService.getFormMetadata(
    //   this.task.formKey
    // );
    this.taskFormGroup = this.dynamicFormService.createGroup(formData.fields);
    console.log(this.taskFormGroup);
  }

  public isValid(): boolean {
    if (this.taskFormGroup) {
      return this.taskFormGroup.valid;
    }

    return true;
  }

  onComplete(): void {
    console.log('alskdjkfa');
  }
}
