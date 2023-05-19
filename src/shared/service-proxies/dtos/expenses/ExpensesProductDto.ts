export interface IExpensesProductDto {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    unit: string;
    location: string;
    finalPrice: number;
  }
  
  export class ExpensesProductDto implements IExpensesProductDto {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    unit: string;
    location: string;
    finalPrice: number;
  
    constructor(data?: IExpensesProductDto) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property))
            (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.productId = _data["productId"];
        this.productName = _data["productName"];
        this.quantity = _data["quantity"];
        this.price = _data["price"];
        this.unit = _data["unit"];
        this.location = _data["location"];
        this.finalPrice = _data["finalPrice"];
      }
    }
  
    static fromJS(data: any): ExpensesProductDto {
      data = typeof data === "object" ? data : {};
      let result = new ExpensesProductDto();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["productId"] = this.productId;
      data["productName"] = this.productName;
      data["quantity"] = this.quantity;
      data["price"] = this.price;
      data["unit"] = this.unit;
      data["location"] = this.location;
      data["finalPrice"] = this.finalPrice;
      return data;
    }
  
    clone(): ExpensesProductDto {
      const json = this.toJSON();
      let result = new ExpensesProductDto();
      result.init(json);
      return result;
    }
  }
  