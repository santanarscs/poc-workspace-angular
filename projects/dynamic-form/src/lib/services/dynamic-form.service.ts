import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DynamicFormModule } from '../dynamic-form.module';

export type ValidatorFactory = (args: any) => ValidatorFn;

@Injectable()
export class DynamicFormService {
  private uriPrefix = 'assets/data/forms/';
  private uriSuffix = '.json';
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}
  public getFormMetadata(formId: string): Promise<any[]> {
    return this.httpClient
      .get<any[]>(this.uriPrefix + formId + this.uriSuffix)
      .toPromise();
  }
  public createGroup(formModel: any): FormGroup {
    const group = this.formBuilder.group({});
    formModel.forEach(controlModel => {
      const name = controlModel.id ? controlModel.id : controlModel.name;
      group.addControl(name, this.createControl(controlModel));
    });
    return group;
  }
  public getValidatorFn(validatorName: string, validatorArgs: any) {
    let validatorFn: any = null;
    //
    // Built-in validators: https://angular.io/guide/form-validation#built-in-validators
    //
    if (Validators.hasOwnProperty(validatorName)) {
      validatorFn = (Validators as any)[validatorName];
      if (validatorArgs !== null) {
        validatorFn = (validatorFn as ValidatorFactory)(validatorArgs);
      }
      return validatorFn;
    }
  }
  public getValidators(validatorModel: any[]) {
    if (validatorModel.length === 0) {
      return null;
    }
    const functions: any[] = [];
    validatorModel.forEach(validator => {
      functions.push(this.getValidatorFn(validator.name, validator.args));
    });
    return Validators.compose(functions);
  }
  public createControl(controlModel: any) {
    return this.formBuilder.control(
      '',
      this.getValidators(controlModel.validators || [])
    );
  }
}
