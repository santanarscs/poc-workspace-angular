import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TaskListComponent],
  imports: [HttpClientModule, BrowserModule, MatListModule, MatIconModule],
  exports: [TaskListComponent],
})
export class FlowableModule {}
