import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-google-autocomplete',
  templateUrl: './google-autocomplete.component.html',
  styleUrls: ['./google-autocomplete.component.scss'],
})
export class GoogleAutocompleteComponent implements OnInit, AfterViewInit {

  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @Input() value: string = '';
  @Input() error: boolean;
  @Input() placeholder: string = '';
  @ViewChild('addresstext') addresstext: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const options = {
      componentRestrictions: { country: 'am'},
    };

    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement, options);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: any) {
    this.setAddress.emit({
      formatted_address: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  }

  reset() {
    this.setAddress.emit(null);
  }
}
