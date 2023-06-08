import { BankAccount } from "../BankAccount";

export interface IEmployeeGetAllDto {
    employeeCode: string;
    employeeName: string;
    jobTitle: string;
    workUnit: string;
    employeePhone: number;
    employeeSalary: number;
    employeeAllowance: number;
    accountId: string;
    accountName: string;
    creationTime: Date;
    lastDateModified: Date;
  }
  
  export class EmployeeGetAllDto implements IEmployeeGetAllDto {
    employeeCode: string;
    employeeName: string;
    jobTitle: string;
    workUnit: string;
    employeePhone: number;
    employeeSalary: number;
    employeeAllowance: number;
    accountId: string;
    accountName: string;
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
        this.employeePhone = data["employeePhone"];
        this.employeeSalary = data["employeeSalary"];
        this.employeeAllowance = data["employeeAllowance"];
        this.accountId = data["accountId"];
        this.accountName = data["accountName"];
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
      data["employeePhone"] = this.employeePhone;
      data["employeeSalary"] = this.employeeSalary;
      data["employeeAllowance"] = this.employeeAllowance;
      data["accountId"] = this.accountId;
      data["accountName"] = this.accountName;
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
  