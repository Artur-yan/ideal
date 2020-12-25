import { Validation } from '@platform/validation';
import { MinLength } from '@platform/validation/decorators';

export class AddressRM extends Validation {

  @MinLength(2)
  addressName: string;
  apartment: string;
  building: string;
  entrance: number;
  hasElevator: boolean = false;
  floor: number;
  isDefault: boolean = false;
  latitude: number;
  longitude: number;
  @MinLength(2)
  title: string;
  additionalInformation: string;

  errors = {
    addressName: false,
    apartment: false,
    building: false,
    entrance: false,
    floor: false,
    isDefault: false,
    title: false,
    additionalInformation: false,
  };

  public validate(): boolean {
    let valid = super.validate();

    if (!this.latitude || !this.longitude || !this.addressName) {
      this.errors.addressName = true;
      valid = false;
    }
    return valid;
  }

  getModel() {
    return {
      addressName: this.addressName,
      apartment: this.apartment,
      building: this.building,
      entrance: this.entrance,
      floor: this.floor,
      isDefault: this.isDefault,
      latitude: this.latitude,
      longitude: this.longitude,
      title: this.title,
      additionalInformation: this.additionalInformation,
      hasElevator: this.hasElevator,
    };
  }

}
