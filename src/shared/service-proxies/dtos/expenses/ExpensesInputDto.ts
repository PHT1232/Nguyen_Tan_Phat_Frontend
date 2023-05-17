import { ExpensesProductDto } from './ExpensesProductDto';

export interface IExpensesInputDto {
  expensesCode: string;
  employeeCode: string;
  orderStatus: number;
  productProvider: string;
  products: ExpensesProductDto[];
  storageId: string;
  discount: number;
  paymentDate: Date;
  description: string;
  totalPrice: number;
}

export class ExpensesInputDto implements IExpensesInputDto {
  expensesCode: string;
  employeeCode: string;
  orderStatus: number;
  productProvider: string;
  products: ExpensesProductDto[];
  storageId: string;
  discount: number;
  paymentDate: Date;
  description: string;
  totalPrice: number;

  constructor(data?: IExpensesInputDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.expensesCode = _data["expensesCode"];
      this.employeeCode = _data["employeeCode"];
      this.orderStatus = _data["orderStatus"];
      this.productProvider = _data["productProvider"];
      this.products = _data["products"];
      this.storageId = _data["storageId"];
      this.discount = _data["discount"];
      this.paymentDate = _data["paymentDate"];
      this.description = _data["description"];
      this.totalPrice = _data["totalPrice"];
    }
  }

  static fromJS(data: any): ExpensesInputDto {
    data = typeof data === "object" ? data : {};
    let result = new ExpensesInputDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["expensesCode"] = this.expensesCode;
    data["employeeCode"] = this.employeeCode;
    data["orderStatus"] = this.orderStatus;
    data["productProvider"] = this.productProvider;
    data["products"] = this.products;
    data["storageId"] = this.storageId;
    data["discount"] = this.discount;
    data["paymentDate"] = this.paymentDate;
    data["description"] = this.description;
    data["totalPrice"] = this.totalPrice;
    return data;
  }

  clone(): ExpensesInputDto {
    const json = this.toJSON();
    let result = new ExpensesInputDto();
    result.init(json);
    return result;
  }
}
