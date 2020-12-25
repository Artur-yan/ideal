import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bgImage]',
})
export class BgImageDirective {

  @Input() altImage: string = null;

  @Input('bgImage') set url(path: string) {
    this.renderer.addClass(this.elementRef.nativeElement, 'G-bg-image');
    if (path) {
      path = path.split(' ').join('%20');
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url("${path}")`);
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', `url("${this.altImage || '/assets/images/no-image.png'}")`);
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}
}
