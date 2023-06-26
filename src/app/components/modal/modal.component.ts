import { Component, Input } from '@angular/core';
import { ProductPriceComponent } from '../productPrice/product-price.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() imageSrc: string = '';

  constructor(){}
  closeModal() {
    this.isVisible = false;
    // this._product.modelVisibleGetProducts = false;
    // this._product.modalVisible = false

    // this._productPrice.modelVisibleGetProducts = false;
    // this._productPrice.modalVisible = false

  }

  openModal() {
    this.isVisible = true;
  }
}
