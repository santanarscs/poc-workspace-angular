import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig, DynamicFormComponent } from 'dynamic-form';
import { QuestionService } from './question.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'credito';
  regConfig: FieldConfig[];
  taskList$: Observable<any>;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  constructor(private service: QuestionService) {
    service
      .getDataForm()
      .pipe(
        take(1),
        map(response => {
          return response.fields.map(
            (res: { name: string; type: string; id: string }) => {
              return {
                type: 'input',
                label: res.name,
                inputType: res.type,
                name: res.id,
                validations: [],
              };
            }
          );
        })
      )
      .subscribe(
        res =>
          (this.regConfig = [
            ...res,
            { type: 'button', label: 'Executar Tarefa' },
          ])
      );

    this.taskList$ = service.getTasks().pipe(
      take(1),
      map(res => res.data)
    );
  }

  submit(event): void {
    console.log(event);
  }
}
