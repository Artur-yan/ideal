import { Directive, Output, EventEmitter, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[infinityScroll]',
})
export class InfinityScrollDirective {

  @Output() update: EventEmitter<undefined> = new EventEmitter();
  @Input() page: number;
  @Input() pageCount: number;
  @Input() fromElement: boolean;
  @Input() reverse: boolean;
  @Input() offset: number = 100;
  
  constructor(
    private el: ElementRef,
  ) {}

  @HostListener('document:scroll', ['$event.target'])
  public scroll = () => {
    if (!this.fromElement && this.page < this.pageCount - 1) {
      const calcScroll = (document.documentElement.scrollHeight - document.documentElement.getBoundingClientRect().height - 200);
      if (document.documentElement.scrollTop > calcScroll) {
        this.update.emit();
      }
    }
  }

  @HostListener('scroll')
  public scrollEl = () => {
    if (this.fromElement && this.page < this.pageCount - 1) {

      if (!this.reverse) {
        const calcScroll = (this.el.nativeElement.scrollHeight - this.el.nativeElement.getBoundingClientRect().height - 200);
        if (this.el.nativeElement.scrollTop > calcScroll) {
          this.update.emit();
        }
      } else {
        if (this.el.nativeElement.scrollTop < this.offset) {
          this.update.emit();
        }
      }
    }
  }
}
