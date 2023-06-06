export interface IRetailProductDto {
    retailId: string;
    productId: string;
    quantity: number;
    price: number;
    finalPrice: number;
  }
  
  export class RetailProductDto implements IRetailProductDto {
    retailId: string;
    productId: string;
    quantity: number;
    price: number;
    finalPrice: number;
  
    constructor(data?: IRetailProductDto) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property))
            (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.retailId = _data["retailId"];
        this.productId = _data["productId"];
        this.quantity = _data["quantity"];
        this.price = _data["price"];
        this.finalPrice = _data["finalPrice"];
      }
    }
  
    static fromJS(data: any): RetailProductDto {
      data = typeof data === "object" ? data : {};
      let result = new RetailProductDto();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["retailId"] = this.retailId;
      data["productId"] = this.productId;
      data["quantity"] = this.quantity;
      data["price"] = this.price;
      data["finalPrice"] = this.finalPrice;
      return data;
    }
  
    clone(): RetailProductDto {
      const json = this.toJSON();
      let result = new RetailProductDto();
      result.init(json);
      return result;
    }
  }
  