export interface ICustomerGetAllDto {
    customerCode: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerWebsite: string;
    customerBankId: string;
    structureName: string;
    customerBankName: string;
    discount: number;
  }
  
  export class CustomerGetAllDto implements ICustomerGetAllDto {
    customerCode: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerWebsite: string;
    customerBankId: string;
    structureName: string;
    customerBankName: string;
    discount: number;
  
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
        this.structureName = data["structureName"];
        this.customerBankId = data["customerBankId"];
        this.customerBankName = data["customerBankName"];
        this.discount = data["discount"];
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
      data["structureName"] = this.structureName;
      data["customerBankId"] = this.customerBankId;
      data["customerBankName"] = this.customerBankName;
      data["discount"] = this.discount;
      return data;
    }
  
    clone(): CustomerGetAllDto {
      const json = this.toJSON();
      let result = new CustomerGetAllDto();
      result.init(json);
      return result;
    }
  }
  