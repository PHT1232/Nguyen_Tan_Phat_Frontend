export interface IBankAccount {
    bankId: number;
    bankName: string;
    bankAddress: string;
    bankCity: string;
  }
  
  export class BankAccount implements IBankAccount {
    bankId: number;
    bankName: string;
    bankAddress: string;
    bankCity: string;
  
    constructor(data?: IBankAccount) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property))
            (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.bankId = _data["bankId"];
        this.bankName = _data["bankName"];
        this.bankAddress = _data["bankAddress"];
        this.bankCity = _data["bankCity"];
      }
    }
  
    static fromJS(data: any): BankAccount {
      data = typeof data === 'object' ? data : {};
      let result = new BankAccount();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["bankId"] = this.bankId;
      data["bankName"] = this.bankName;
      data["bankAddress"] = this.bankAddress;
      data["bankCity"] = this.bankCity;
      return data;
    }
  
    clone(): BankAccount {
      const json = this.toJSON();
      let result = new BankAccount();
      result.init(json);
      return result;
    }
  }
  