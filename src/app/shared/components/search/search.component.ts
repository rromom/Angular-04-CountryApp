import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'shared-search',
  standalone: false,

  templateUrl: './search.component.html',
  styles: ``
})

export class SearchComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue( value: string ):void {
    this.onValue.emit( value );
  }


}
