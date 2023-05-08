import { BankAccount } from "../BankAccount";

export interface ICustomerGetAllDto {
    orgCustomerCode: string;
    orgCustomerName: string;
    orgCustomerPhone: string;
    orgCustomerAddress: string;
    orgCustomerWebsite: string;
    orgCustomerBankAccount: BankAccount
  }
  
  export class CustomerGetAllDto implements ICustomerGetAllDto {
    orgCustomerCode: string;
    orgCustomerName: string;
    orgCustomerPhone: string;
    orgCustomerAddress: string;
    orgCustomerWebsite: string;
    orgCustomerBankAccount: BankAccount
  
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
        this.orgCustomerCode = data["orgCustomerCode"];
        this.orgCustomerName = data["orgCustomerName"];
        this.orgCustomerPhone = data["orgCustomerPhone"];
        this.orgCustomerAddress = data["orgCustomerAddress"];
        this.orgCustomerWebsite = data["orgCustomerWebsite"];
        this.orgCustomerBankAccount = data["orgCustomerBankAccount"];
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
      data["orgCustomerCode"] = this.orgCustomerCode;
      data["orgCustomerName"] = this.orgCustomerName;
      data["orgCustomerPhone"] = this.orgCustomerPhone;
      data["orgCustomerAddress"] = this.orgCustomerAddress;
      data["orgCustomerWebsite"] = this.orgCustomerWebsite;
      data["orgCustomerBankAccount"] = this.orgCustomerBankAccount;
      return data;
    }
  
    clone(): CustomerGetAllDto {
      const json = this.toJSON();
      let result = new CustomerGetAllDto();
      result.init(json);
      return result;
    }
  }
  