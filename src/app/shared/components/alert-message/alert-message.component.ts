import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-alert-message',
  standalone: false,

  templateUrl: './alert-message.component.html',
  styles: ``
})
export class AlertMessageComponent {

  @Input()
  public message: string = '';

}
