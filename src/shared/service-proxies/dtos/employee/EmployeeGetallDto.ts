import { BankAccount } from "../BankAccount";

export interface IEmployeeGetAllDto {
    employeeCode: string;
    employeeName: string;
    jobTitle: string;
    workUnit: string;
    taxIdentification: string;
    employeeBankAccount: BankAccount;
    creationTime: Date;
    lastDateModified: Date;
  }
  
  export class EmployeeGetAllDto implements IEmployeeGetAllDto {
    employeeCode: string;
    employeeName: string;
    jobTitle: string;
    workUnit: string;
    taxIdentification: string;
    employeeBankAccount: BankAccount;
    creationTime: Date;
    lastDateModified: Date;
  
    constructor(data?: IEmployeeGetAllDto) {
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
        this.employeeCode = data["employeeCode"];
        this.employeeName = data["employeeName"];
        this.jobTitle = data["jobTitle"];
        this.workUnit = data["workUnit"];
        this.taxIdentification = data["taxIdentification"];
        this.employeeBankAccount = data["employeeBankAccount"];
        this.creationTime = data["creationTime"];
        this.lastDateModified = data["lastDateModified"];
      }
    }
  
    static fromJS(data: any): EmployeeGetAllDto {
      data = typeof data === "object" ? data : {};
      let result = new EmployeeGetAllDto();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === "object" ? data : {};
      data["employeeCode"] = this.employeeCode;
      data["employeeName"] = this.employeeName;
      data["jobTitle"] = this.jobTitle;
      data["workUnit"] = this.workUnit;
      data["taxIdentification"] = this.taxIdentification;
      data["employeeBankAccount"] = this.employeeBankAccount;
      data["creationTime"] = this.creationTime;
      data["lastDateModified"] = this.lastDateModified;
      return data;
    }
  
    clone(): EmployeeGetAllDto {
      const json = this.toJSON();
      let result = new EmployeeGetAllDto();
      result.init(json);
      return result;
    }
  }
  