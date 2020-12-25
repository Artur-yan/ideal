import { Directive, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[checkbox]',
})
export class CheckboxDirective implements OnInit {

  @Input() disable: boolean;
  @Input('checkbox') set setCheckboxState(e: boolean) {
    this.state = e;
    this.change.emit(this.state);
    this.state ? this.addClass() : this.removeClass();
  }
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  private state: boolean;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('click')
  public onClick(e) {
    if (!this.disable) {
      this.setCheckboxState = !this.state;
    }
  }

  private addClass = () => {
    this.renderer.addClass(this.elementRef.nativeElement, 'G-checkbox-active');
    this.renderer.addClass(this.elementRef.nativeElement, 'icon-check');
  }

  private removeClass = () => {
    this.renderer.removeClass(this.elementRef.nativeElement, 'G-checkbox-active');
    this.renderer.removeClass(this.elementRef.nativeElement, 'icon-check');
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'G-checkbox-item');
    this.state ? this.addClass() : this.removeClass();
  }
}
