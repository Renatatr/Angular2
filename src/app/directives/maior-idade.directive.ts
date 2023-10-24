import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaiorIdadeDirective,
    multi: true
  }]
})
export class MaiorIdadeDirective implements Validator {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const dataNascimento = control.value;
    const anoNascimento = new Date(dataNascimento).getFullYear();
    const mesNascimento = new Date(dataNascimento).getMonth();
    const diaNascimento = new Date(dataNascimento).getDay();
    const anoAtual = new Date().getFullYear();
    const mesAtual = new Date().getMonth();
    const diaAtual = new Date().getDay();
    var idade = anoAtual - anoNascimento;
    var ehMaior = false;

    if (mesAtual < mesNascimento || (mesAtual == mesNascimento && diaAtual < diaNascimento)){
        idade--;
    }

    if (idade >= 18) {
      ehMaior = true;
    }
    
    return ehMaior ? null : {'maiorIdadeValidator' : true};
  }
}
