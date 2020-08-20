import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'flow-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  items: any[];
  selectedItem: any = null;
  subscriptions: Subscription[] = [];

  constructor(private service: TasksService) {}

  ngOnInit(): void {
    let modelSubscription: Subscription = new Subscription();
    this.subscriptions.push(modelSubscription);
    modelSubscription = this.service.getTasks().subscribe(model => {
      this.items = model.data;
      this.selectedItem = this.items[0];
    });
  }
  onSelect(item: any): void {
    this.selectedItem = item;
  }
}
