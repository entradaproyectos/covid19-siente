import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'imagenes'
})
export class ImagenesPipe implements PipeTransform {

  transform(value: string): string {

    if(value.includes('/.') || !value || value == null || value == undefined)  {
      return "/assets/img/noimage.jpg";
    }else{
      return value;
    }
  }

}
