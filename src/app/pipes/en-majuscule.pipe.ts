import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enMajuscule'
})
export class EnMajusculePipe implements PipeTransform {

  transform(value: string, prefix: string): string {

    let texte = prefix + value[0].toUpperCase();
    texte += value.substring(1).toLocaleLowerCase();

    return texte;
  }

}
