import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  
  @HostBinding('class.G-btn') classButton = true;

  constructor() { }

  ngOnInit() {
  }

}
