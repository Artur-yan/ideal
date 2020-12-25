import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[debounce]',
})
export class DebounceDirective implements OnInit {
  @Input() delay: number = 300;
  @Input() subject: Subject<any>;

  constructor(
    private elementRef: ElementRef,
    private model: NgModel,
  ) { }

  ngOnInit(): void {
    const eventStream = fromEvent(this.elementRef.nativeElement, 'keyup')
      .pipe(map(() => this.model.value))
      .pipe(debounceTime(this.delay));

    this.model.viewToModelUpdate = () => { };

    eventStream.subscribe(input => {
      this.model.viewModel = input;
      this.model.update.emit(input);
      if (this.subject) {
        this.subject.next();
      }
    });
  }
}
