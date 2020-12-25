import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef,
  ComponentFactory,
} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Directive({
  selector: '[pLoader]',
})
export class LoaderDirective implements OnInit {

  private _loaderComponentRef: ComponentRef<LoaderComponent>;
  private _componentFactory: ComponentFactory<LoaderComponent>;
  private show: boolean;

  @Input() set pLoader(show: boolean) {
    this.show = show;
    show ? this.attachLoader() : this.detachLoader();
  }

  @HostBinding('disabled')
  @HostBinding('class.loading')
  get disabled(): boolean {
    return this.show;
  }

  constructor(
    private _hostContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _renderer: Renderer2,
  ) {
    this._componentFactory = this._componentFactoryResolver.resolveComponentFactory(LoaderComponent);
  }

  ngOnInit() {
  }

  private attachLoader(): void {
    this._loaderComponentRef = this._hostContainerRef.createComponent(this._componentFactory);
    this._renderer.appendChild(this._hostContainerRef.element.nativeElement, this._loaderComponentRef.location.nativeElement);
  }

  private detachLoader(): void {
    this._hostContainerRef.remove();
  }
}
