import { Component, OnInit } from '@angular/core';
import { ToasterEnum } from '../enums/toaster-type.enum';
import { ToasterService } from '../services/toaster.service';
import { Toaster } from '../models/toaster.model';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {

  private id: number = 0;
  public elements: Toaster[] = [];

  public ToasterEnum = ToasterEnum;

  constructor(
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    // this.pushNewItem(new Toaster({ status: ToasterEnum.Success, text: 'Success' }));
    this.toasterService.toaster
      .subscribe((value: Toaster) => {
        this.pushNewItem(value);
      });
  }

  private pushNewItem = (item: Toaster): void => {
    item.id = this.id++;
    this.elements.push(item);
    this.startRemoveTimer(item);
  }

  private startRemoveTimer = (item: Toaster) => {
    setTimeout(() => {
      if (!item.disableRemove) {
        this.hideItem(item.id);
      }
    }, 4000);
  }

  private removeItem = (id: number): void => {
    this.elements = this.elements.filter(x => x.id !== id);
  }

  public hideItem = (id: number, event?: Event): void => {
    if (event) event.stopPropagation();
    this.elements.map(x => {
      if (x.id === id) x.isActive = false;
      return x;
    });
    setTimeout(() => this.removeItem(id), 500);
  }

  public disableRemove = (id: number) => {
    this.elements.map(x => {
      if (x.id === id) x.disableRemove = true;
      return x;
    });
  }
}
