export interface IExpensesGetAllDto {
    expensesCode: string;
    productProvider: string;
    storageName: string;
    description: string;
    paymentDate: Date;
    orderStatus: number;
    employeeCode: string;
    totalPrice: number;
    totalPriceAfterDiscount: number;
    creationTime: Date;
  }
  
  export class ExpensesGetAllDto implements IExpensesGetAllDto {
    expensesCode: string;
    productProvider: string;
    storageName: string;
    description: string;
    paymentDate: Date;
    orderStatus: number;
    employeeCode: string;
    totalPrice: number;
    totalPriceAfterDiscount: number;
    creationTime: Date;
  
    constructor(data?: IExpensesGetAllDto) {
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
        this.productProvider = _data["productProvider"];
        this.storageName = _data["storageName"];
        this.description = _data["description"];
        this.paymentDate = _data["paymentDate"];
        this.orderStatus = _data["orderStatus"];
        this.employeeCode = _data["employeeCode"];
        this.totalPrice = _data["totalPrice"];
        this.totalPriceAfterDiscount = _data["totalPriceAfterDiscount"];
        this.creationTime = _data["creationTime"];
      }
    }
  
    static fromJS(data: any): ExpensesGetAllDto {
      data = typeof data === "object" ? data : {};
      let result = new ExpensesGetAllDto();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["expensesCode"] = this.expensesCode;
      data["productProvider"] = this.productProvider;
      data["storageName"] = this.storageName;
      data["description"] = this.description;
      data["paymentDate"] = this.paymentDate;
      data["orderStatus"] = this.orderStatus;
      data["employeeCode"] = this.employeeCode;
      data["totalPrice"] = this.totalPrice;
      data["totalPriceAfterDiscount"] = this.totalPriceAfterDiscount;
      data["creationTime"] = this.creationTime;
      return data;
    }
  
    clone(): ExpensesGetAllDto {
      const json = this.toJSON();
      let result = new ExpensesGetAllDto();
      result.init(json);
      return result;
    }
  }
  