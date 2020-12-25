import { Directive, EventEmitter, ElementRef, Renderer2, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[radio]',
})
export class RadioDirective implements OnInit {

  @Input() disable: boolean;

  @Input('radio') set setRadioState(e: boolean) {
    this.state = e;
    this.change.emit(this.state);
    this.state ? this.addClass() : this.removeClass();
  }

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  private state: boolean;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  private addClass = () => {
    this.renderer.addClass(this.elementRef.nativeElement, 'G-radio-active');
  }

  private removeClass = () => {
    this.renderer.removeClass(this.elementRef.nativeElement, 'G-radio-active');
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'G-radio-item');
    this.state ? this.addClass() : this.removeClass();
  }

}
