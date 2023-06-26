export class ProductPrice {
  id!: number;
  productId!: number;
  urlImage!: string;
  color!: string;
  price!: number;
  file?: string;
  product: any;

  constructor(productId: number, urlImage: string, color: string, price: number, file?: string,id?:number) {
    this.id = id !== undefined ? id : 0;     this.productId = productId;
    this.urlImage = urlImage;
    this.color = color;
    this.price = price;
    this.file = file;
  }
}
