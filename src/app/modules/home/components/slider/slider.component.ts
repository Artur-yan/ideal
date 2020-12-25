import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  sliderIndex: number = 0;
  images: Array<string> = [
    '/assets/images/slider3.png',
    '/assets/images/slider2.png',
    '/assets/images/slider1.png',
  ];
  constructor() { }

  next(index: number) {
    this.sliderIndex = index;
  }

  ngOnInit(): void {
  }

}
