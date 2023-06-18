export interface IRetailCustomerDto {
    retailCode: string;
    customerCode: string;
    customerName: string;
    reveciveAddress: string;
    discount: number;
    phoneToCall: string;
  }
  
  export class RetailCustomerDto implements IRetailCustomerDto {
    retailCode: string;
    customerCode: string;
    customerName: string;
    reveciveAddress: string;
    discount: number;
    phoneToCall: string;
  
    constructor(data?: IRetailCustomerDto) {
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
        this.customerCode = _data["customerCode"];
        this.customerName = _data["customerName"];
        this.reveciveAddress = _data["reveciveAddress"];
        this.discount = _data["discount"];
        this.phoneToCall = _data["phoneToCall"];
      }
    }
  
    static fromJS(data: any): RetailCustomerDto {
      data = typeof data === "object" ? data : {};
      let result = new RetailCustomerDto();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["retailCode"] = this.retailCode;
      data["customerCode"] = this.customerCode;
      data["customerName"] = this.customerName;
      data["reveciveAddress"] = this.reveciveAddress;
      data["discount"] = this.discount;
      data["phoneToCall"] = this.phoneToCall;
      return data;
    }
  
    clone(): RetailCustomerDto {
      const json = this.toJSON();
      let result = new RetailCustomerDto();
      result.init(json);
      return result;
    }
  }
  