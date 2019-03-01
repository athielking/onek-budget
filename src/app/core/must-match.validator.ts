import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

export function MustMatch(matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {

      if (!control.parent.controls[matchingControlName]) {
          console.error(`Cannot Validate Control, matching control: ${matchingControlName} does not exist on the form`);
          return null;
      }
      const valueMatches = control.parent.controls[matchingControlName].value === control.value;
      return valueMatches ? {'mustMatch': {value: control.value}} : null;
    };
  }
