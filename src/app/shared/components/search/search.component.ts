import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search',
  standalone: false,

  templateUrl: './search.component.html',
  styles: ``
})

export class SearchComponent implements OnInit, OnDestroy {

  private deBouncer: Subject<string> = new Subject();
  private deBouncerSubscribe?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();




  emitValue( value: string ):void {
    this.onValue.emit( value );
  }

  ngOnInit(): void {
    this.deBouncerSubscribe = this.deBouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    } );
  }

  ngOnDestroy(): void {

    this.deBouncerSubscribe?.unsubscribe();

  }

  deBouncerEmit( searchTerm: string ){
    this.deBouncer.next( searchTerm );
  }




}
