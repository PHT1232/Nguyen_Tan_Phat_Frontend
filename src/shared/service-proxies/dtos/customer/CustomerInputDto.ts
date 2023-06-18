import { BankAccount } from "../BankAccount";

export interface ICustomerInputDto {
    customerCode: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerWebsite: string;
    customerEmail: string;
    structureCode: string;
    customerDescription: string;
    discount: number;
    bankAccount: BankAccount;
  }
  
  export class CustomerInputDto implements ICustomerInputDto {
    customerCode: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    customerWebsite: string;
    customerEmail: string;
    structureCode: string;
    customerDescription: string;
    discount: number;
    bankAccount: BankAccount;
  
    constructor(data?: ICustomerInputDto) {
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
        this.structureCode = _data["structureCode"];
        this.customerDescription = _data["customerDescription"];
        this.discount = _data["discount"];
        this.bankAccount = _data["bankAccount"];
      }
    }
  
    static fromJS(data: any): CustomerInputDto {
      data = typeof data === "object" ? data : {};
      let result = new CustomerInputDto();
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
      data["structureCode"] = this.structureCode;
      data["customerDescription"] = this.customerDescription;
      data["discount"] = this.discount;
      data["bankAccount"] = this.bankAccount;
      return data;
    }
  
    clone(): CustomerInputDto {
      const json = this.toJSON();
      let result = new CustomerInputDto();
      result.init(json);
      return result;
    }
  }
  