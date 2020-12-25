import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  @Input() isPageLoader: boolean = false;

  @Input() color: string = '#fff';
  @Input() size: number = 25;

  constructor() { }

  ngOnInit() {
  }

}
