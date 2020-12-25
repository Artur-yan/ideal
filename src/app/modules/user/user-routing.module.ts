import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@modules/user/main/main.component';
import { OrderHistoryComponent } from '@modules/user/pages/order-history/order-history.component';
import { CardsComponent } from '@modules/user/pages/cards/cards.component';
import { AddressesComponent } from '@modules/user/pages/addresses/addresses.component';
import { AddressDetailsComponent } from '@modules/user/pages/address-details/address-details.component';
import { ProfileComponent } from '@modules/user/pages/profile/profile.component';
import { PromoCodesComponent } from '@modules/user/pages/promo-codes/promo-codes.component';
import { OrderDetailsComponent } from '@modules/user/pages/order-details/order-details.component';
import { AddAddressComponent } from '@modules/user/pages/add-address/add-address.component';
import { ProfileWrapperComponent } from './pages/profile-wrapper/profile-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'order-history/details',
        component: OrderDetailsComponent,
      },
      {
        path: 'addresses/new',
        component: AddAddressComponent,
      },
      {
        path: 'addresses/:id',
        component: AddAddressComponent,
      },
      {
        path: '',
        component: ProfileWrapperComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent,
          },
          {
            path: 'order-history',
            component: OrderHistoryComponent,
          },
          {
            path: 'addresses',
            component: AddressesComponent,
          },
          {
            path: 'cards',
            component: CardsComponent,
          },
          {
            path: 'promo-codes',
            component: PromoCodesComponent,
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
