import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { Validation } from '@platform/validation';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[autoValidation]',
})
export class AutoValidationDirective implements OnInit {
  @Input() autoValidation: Validation;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    const eventStream = fromEvent(this.elementRef.nativeElement, 'keyup');

    eventStream.subscribe(() => {
      if (this.autoValidation.isSubmited) {
        this.autoValidation.validate();
      }
    });
  }
}
