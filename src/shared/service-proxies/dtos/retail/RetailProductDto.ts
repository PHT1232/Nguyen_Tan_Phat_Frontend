export interface IRetailProductDto {
    retailId: string;
    productId: string;
    storageId: string;
    productName: string;
    quantity: number;
    price: number;
    unit: string;
    finalPrice: number;
  }
  
  export class RetailProductDto implements IRetailProductDto {
    retailId: string;
    productId: string;
    storageId: string;
    productName: string;
    quantity: number;
    price: number;
    unit: string;
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
        this.storageId = _data["storageId"];
        this.productName = _data["productName"];
        this.quantity = _data["quantity"];
        this.price = _data["price"];
        this.unit = _data["unit"];
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
      data["storageId"] = this.storageId;
      data["productName"] = this.productName;
      data["quantity"] = this.quantity;
      data["price"] = this.price;
      data["unit"] = this.unit;
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
  