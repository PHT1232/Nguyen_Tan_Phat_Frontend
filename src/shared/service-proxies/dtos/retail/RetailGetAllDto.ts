export interface IRetailGetAllDto {
    retailCode: string;
    nameOfReceiver: string;
    orderCreator: string;
    orderStatus: number;
    structureId: string;
    isDelivered: boolean;
    totalPrice: number;
    totalPriceAfterDiscount: number;
  }
  
  export class RetailGetAllDto implements IRetailGetAllDto {
    retailCode: string;
    nameOfReceiver: string;
    orderCreator: string;
    orderStatus: number;
    structureId: string;
    isDelivered: boolean;
    totalPrice: number;
    totalPriceAfterDiscount: number;
  
    constructor(data?: IRetailGetAllDto) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property))
            (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.retailCode = _data["retailCode"];
        this.nameOfReceiver = _data["nameOfReceiver"];
        this.orderCreator = _data["orderCreator"];
        this.orderStatus = _data["orderStatus"];
        this.structureId = _data["structureId"];
        this.isDelivered = _data["isDelivered"];
        this.totalPrice = _data["totalPrice"];
        this.totalPriceAfterDiscount = _data["totalPriceAfterDiscount"];
      }
    }
  
    static fromJS(data: any): RetailGetAllDto {
      data = typeof data === "object" ? data : {};
      let result = new RetailGetAllDto();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["retailCode"] = this.retailCode;
      data["nameOfReceiver"] = this.nameOfReceiver;
      data["orderCreator"] = this.orderCreator;
      data["orderStatus"] = this.orderStatus;
      data["structureId"] = this.structureId;
      data["isDelivered"] = this.isDelivered;
      data["totalPrice"] = this.totalPrice;
      data["totalPriceAfterDiscount"] = this.totalPriceAfterDiscount;
      return data;
    }
  
    clone(): RetailGetAllDto {
      const json = this.toJSON();
      let result = new RetailGetAllDto();
      result.init(json);
      return result;
    }
  }
  