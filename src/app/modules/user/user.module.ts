import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { CardsComponent } from './pages/cards/cards.component';
import { PromoCodesComponent } from './pages/promo-codes/promo-codes.component';
import { UserRoutingModule } from '@modules/user/user-routing.module';
import { AddressesComponent } from '@modules/user/pages/addresses/addresses.component';
import { AddressDetailsComponent } from '@modules/user/pages/address-details/address-details.component';
import { GlobalModule } from '@platform/components/global/global.module';
import { JuridicalProfileComponent } from './pages/juridical-profile/juridical-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PasswordComponent } from './components/password/password.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { HeaderComponent } from './pages/header/header.component';
import { AddAddressComponent } from './pages/add-address/add-address.component';
import { CalendarModule } from 'primeng/calendar';
import { ProfileWrapperComponent } from './pages/profile-wrapper/profile-wrapper.component';
import { VerifyModalComponent } from './components/verify-modal/verify-modal.component';
import { VerifyPhoneModalComponent } from './components/verify-phone-modal/verify-phone-modal.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    GlobalModule,
    CalendarModule,
  ],
  declarations: [
    MainComponent,
    MyProfileComponent,
    OrderHistoryComponent,
    CardsComponent,
    PromoCodesComponent,
    AddressesComponent,
    AddressDetailsComponent,
    JuridicalProfileComponent,
    ProfileComponent,
    PasswordComponent,
    OrderDetailsComponent,
    HeaderComponent,
    AddAddressComponent,
    ProfileWrapperComponent,
    VerifyModalComponent,
    VerifyPhoneModalComponent,
  ],
})
export class UserModule {
}
