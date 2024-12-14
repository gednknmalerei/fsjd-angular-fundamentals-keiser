import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:id', component: ProductItemDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'confirmation', component: ConfirmationComponent },
];
