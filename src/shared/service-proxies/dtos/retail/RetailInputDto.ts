import { RetailCustomerDto } from './RetailCustomerDto';
import { RetailProductDto } from './RetailProductDto';

export interface IRetailInputDto {
  customer: RetailCustomerDto;
  products: RetailProductDto[];
  retailCode: string;
  orderCreator: string;
  deliveryEmployee: string;
  orderStatus: number;
  structureId: string;
  description: string;
  paymentMethod: number;
  isHomeDelivery: boolean;
  isDelivered: boolean;
  totalPrice: number;
  discount: number;
}

export class RetailInputDto implements IRetailInputDto {
  customer: RetailCustomerDto;
  products: RetailProductDto[];
  retailCode: string;
  orderCreator: string;
  deliveryEmployee: string;
  orderStatus: number;
  structureId: string;
  description: string;
  paymentMethod: number;
  isHomeDelivery: boolean;
  isDelivered: boolean;
  totalPrice: number;
  discount: number;

  constructor(data?: IRetailInputDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.customer = _data["customer"] ? RetailCustomerDto.fromJS(_data["customer"]) : undefined;
      if (_data["products"]) {
        this.products = [];
        for (let item of _data["products"]) {
          this.products.push(RetailProductDto.fromJS(item));
        }
      }
      this.retailCode = _data["retailCode"];
      this.orderCreator = _data["orderCreator"];
      this.deliveryEmployee = _data["deliveryEmployee"];
      this.orderStatus = _data["orderStatus"];
      this.structureId = _data["structureId"];
      this.description = _data["description"];
      this.paymentMethod = _data["paymentMethod"];
      this.isHomeDelivery = _data["isHomeDelivery"];
      this.isDelivered = _data["isDelivered"];
      this.totalPrice = _data["totalPrice"];
      this.discount = _data["discount"];
    }
  }

  static fromJS(data: any): RetailInputDto {
    data = typeof data === "object" ? data : {};
    let result = new RetailInputDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["customer"] = this.customer ? this.customer.toJSON() : undefined;
    if (this.products && this.products.length) {
      data["products"] = this.products.map((item) => item.toJSON());
    }
    data["retailCode"] = this.retailCode;
    data["orderCreator"] = this.orderCreator;
    data["deliveryEmployee"] = this.deliveryEmployee;
    data["orderStatus"] = this.orderStatus;
    data["structureId"] = this.structureId;
    data["description"] = this.description;
    data["paymentMethod"] = this.paymentMethod;
    data["isHomeDelivery"] = this.isHomeDelivery;
    data["isDelivered"] = this.isDelivered;
    data["totalPrice"] = this.totalPrice;
    data["discount"] = this.discount;
    return data;
  }

  clone(): RetailInputDto {
    const json = this.toJSON();
    let result = new RetailInputDto();
    result.init(json);
    return result;
  }
}
