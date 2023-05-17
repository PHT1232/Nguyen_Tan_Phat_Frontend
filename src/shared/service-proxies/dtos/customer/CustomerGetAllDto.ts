export interface ICustomerGetAllDto {
    customerCode: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerWebsite: string;
    customerBankId: string;
    customerBankName: string;
  }
  
  export class CustomerGetAllDto implements ICustomerGetAllDto {
    customerCode: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerWebsite: string;
    customerBankId: string;
    customerBankName: string;
  
    constructor(data?: ICustomerGetAllDto) {
      if (data) {
        for (let property in data) {
          if (data.hasOwnProperty(property)) {
            (<any>this)[property] = (<any>data)[property];
          }
        }
      }
    }
  
    init(data?: any) {
      if (data) {
        this.customerCode = data["customerCode"];
        this.customerName = data["customerName"];
        this.customerPhone = data["customerPhone"];
        this.customerAddress = data["customerAddress"];
        this.customerWebsite = data["customerWebsite"];
        this.customerBankId = data["customerBankId"];
        this.customerBankName = data["customerBankName"];
      }
    }
  
    static fromJS(data: any): CustomerGetAllDto {
      data = typeof data === "object" ? data : {};
      let result = new CustomerGetAllDto();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["customerCode"] = this.customerCode;
      data["customerName"] = this.customerName;
      data["customerPhone"] = this.customerPhone;
      data["customerAddress"] = this.customerAddress;
      data["customerWebsite"] = this.customerWebsite;
      data["customerBankId"] = this.customerBankId;
      data["customerBankName"] = this.customerBankName;
      return data;
    }
  
    clone(): CustomerGetAllDto {
      const json = this.toJSON();
      let result = new CustomerGetAllDto();
      result.init(json);
      return result;
    }
  }
  