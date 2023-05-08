import { BankAccount } from "../BankAccount";

export interface ICustomerInputDto {
    orgCustomerCode: string;
    orgCustomerName: string;
    orgCustomerPhone: string;
    orgCustomerAddress: string;
    orgCustomerWebsite: string;
    orgCustomerEmail: string;
    orgCustomerDescription: string;
    bankAccount: BankAccount;
  }
  
  export class CustomerInputDto implements ICustomerInputDto {
    orgCustomerCode: string;
    orgCustomerName: string;
    orgCustomerPhone: string;
    orgCustomerAddress: string;
    orgCustomerWebsite: string;
    orgCustomerEmail: string;
    orgCustomerDescription: string;
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
        this.orgCustomerCode = _data["orgCustomerCode"];
        this.orgCustomerName = _data["orgCustomerName"];
        this.orgCustomerPhone = _data["orgCustomerPhone"];
        this.orgCustomerAddress = _data["orgCustomerAddress"];
        this.orgCustomerWebsite = _data["orgCustomerWebsite"];
        this.orgCustomerEmail = _data["orgCustomerEmail"];
        this.orgCustomerDescription = _data["orgCustomerDescription"];
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
      data["orgCustomerCode"] = this.orgCustomerCode;
      data["orgCustomerName"] = this.orgCustomerName;
      data["orgCustomerPhone"] = this.orgCustomerPhone;
      data["orgCustomerAddress"] = this.orgCustomerAddress;
      data["orgCustomerWebsite"] = this.orgCustomerWebsite;
      data["orgCustomerEmail"] = this.orgCustomerEmail;
      data["orgCustomerDescription"] = this.orgCustomerDescription;
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
  