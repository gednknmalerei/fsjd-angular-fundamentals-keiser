import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit {
  @Input() orderForm: any;
  public order: CartItem[] = [];
  public orderProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.orderForm = {
        firstName: params['firstName'],
        lastName: params['lastName'],
        email: params['email'],
        address: params['address'],
        postcode: params['postcode'],
        city: params['city'],
      };
    });

    this.order = this.cartService.getOrder();
    console.log('Order:', this.order);

    this.getOrderProducts();
  }

  private getOrderProducts(): void {
    this.orderProducts = [];
    for (let orderItem of this.order) {
      if (!this.orderProducts.some((product) => product.id === orderItem.id)) {
        this.dataService.getDataById(orderItem.id).subscribe({
          next: (data) => {
            if (data) {
              this.orderProducts.push(data);
            }
          },
          error: (err) => console.error('Error on loading products:', err),
        });
      }
    }
  }
}
