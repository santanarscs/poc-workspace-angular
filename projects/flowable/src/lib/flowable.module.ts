import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { DynamicFormModule } from 'dynamic-form';

@NgModule({
  declarations: [TaskListComponent, TaskComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatListModule,
    MatIconModule,
    DynamicFormModule.forRoot(),
  ],
  exports: [TaskListComponent],
})
export class FlowableModule {}
