import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product.model';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.scss',
})
export class ProductItemDetailComponent implements OnInit {
  private productId: number | null = null;
  public product: Product | undefined;
  public faCartShopping = faCartShopping;
  public quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getDataById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => console.error('Error on loading products:', err),
    });
  }

  public addToCart() {
    if (this.product) {
      const updatedCart = this.cartService.addToCart(
        this.product.id,
        this.quantity
      );
      alert(`Product "${this.product.name}" was added to your cart!`);
    } else {
      console.error('Error on adding product to cart: Product is undefined');
    }
  }
}
