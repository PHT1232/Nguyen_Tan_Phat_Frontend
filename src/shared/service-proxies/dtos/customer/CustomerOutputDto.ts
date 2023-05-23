import { BankAccount } from "../BankAccount";

export interface ICustomerOutputDto {
    customerCode: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerWebsite: string;
    customerEmail: string;
    customerDescription: string;
    discount: number;
    bankAccount: BankAccount;
  }
  
  export class CustomerOutputDto implements ICustomerOutputDto {
    customerCode: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerWebsite: string;
    customerEmail: string;
    customerDescription: string;
    discount: number;
    bankAccount: BankAccount;
  
    constructor(data?: ICustomerOutputDto) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property))
            (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.customerCode = _data["customerCode"];
        this.customerName = _data["customerName"];
        this.customerPhone = _data["customerPhone"];
        this.customerAddress = _data["customerAddress"];
        this.customerWebsite = _data["customerWebsite"];
        this.customerEmail = _data["customerEmail"];
        this.customerDescription = _data["customerDescription"];
        this.discount = _data["discount"];
        this.bankAccount = _data["bankAccount"];
      }
    }
  
    static fromJS(data: any): CustomerOutputDto {
      data = typeof data === "object" ? data : {};
      let result = new CustomerOutputDto();
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
      data["customerEmail"] = this.customerEmail;
      data["customerDescription"] = this.customerDescription;
      data["discount"] = this.discount;
      data["bankAccount"] = this.bankAccount;
      return data;
    }
  
    clone(): CustomerOutputDto {
      const json = this.toJSON();
      let result = new CustomerOutputDto();
      result.init(json);
      return result;
    }
  }
  