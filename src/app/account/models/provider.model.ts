export class Provider {
  code: number;
  image: string;
  name: string;
  products?: string[] = [];
  category: string;
  surname: string;
  rechargeTypes?: RechargeType[] = [];

  constructor(code: number, name: string, image: string, category: string, surname: string) {
    this.code = code;
    this.image = image;
    this.name = name;
    this.category = category;
    this.surname = surname;
  }

  addProduct(product: string) {
    this.products?.push(product);
  }

  addRechargeType(rechargeType: RechargeType) {
    this.rechargeTypes?.push(rechargeType);
  }
}
export class RechargeType {

  code?: number;
  name?: string;

  constructor(code: number, name: string) {
    this.code = code;
    this.name = name;
  }
}
