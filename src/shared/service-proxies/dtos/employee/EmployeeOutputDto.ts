import { BankAccount } from "../BankAccount";
import { CMNDDto } from "./CMNDDto";

export interface IEmployeeOutputDto {
    employeeCode: string;
    employeeName: string;
    employeeGender: string;
    employeeDateOfBirth: Date;
    employeeCMND: CMNDDto;
    employeePhone: number;
    jobTitle: string;
    workUnit: string;
    taxIdentification: string;
    employeeSalary: number;
    salaryFactor: number;
    typeOfContract: string;
    employeeBankAccount: BankAccount;
  }
  
  export class EmployeeOutputDto implements IEmployeeOutputDto {
    employeeCode: string;
    employeeName: string;
    employeeGender: string;
    employeeDateOfBirth: Date;
    employeeCMND: CMNDDto;
    employeePhone: number;
    jobTitle: string;
    workUnit: string;
    taxIdentification: string;
    employeeSalary: number;
    salaryFactor: number;
    typeOfContract: string;
    employeeBankAccount: BankAccount;
  
    constructor(data?: IEmployeeOutputDto) {
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
        this.employeeGender = data["employeeGender"];
        this.employeeDateOfBirth = data["employeeDateOfBirth"];
        this.employeeCMND = data["employeeCMND"];
        this.employeePhone = data["employeePhone"];
        this.jobTitle = data["jobTitle"];
        this.workUnit = data["workUnit"];
        this.taxIdentification = data["taxIdentification"];
        this.employeeSalary = data["employeeSalary"];
        this.salaryFactor = data["salaryFactor"];
        this.typeOfContract = data["typeOfContract"];
        this.employeeBankAccount = data["employeeBankAccount"];
      }
    }
  
    static fromJS(data: any): EmployeeOutputDto {
      data = typeof data === 'object' ? data : {};
      let result = new EmployeeOutputDto();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["employeeCode"] = this.employeeCode;
      data["employeeName"] = this.employeeName;
      data["employeeGender"] = this.employeeGender;
      data["employeeDateOfBirth"] = this.employeeDateOfBirth;
      data["employeeCMND"] = this.employeeCMND;
      data["employeePhone"] = this.employeePhone;
      data["jobTitle"] = this.jobTitle;
      data["workUnit"] = this.workUnit;
      data["taxIdentification"] = this.taxIdentification;
      data["employeeSalary"] = this.employeeSalary;
      data["salaryFactor"] = this.salaryFactor;
      data["typeOfContract"] = this.typeOfContract;
      data["employeeBankAccount"] = this.employeeBankAccount;
      return data;
    }
  
    clone(): EmployeeOutputDto {
      const json = this.toJSON();
      let result = new EmployeeOutputDto();
      result.init(json);
      return result;
    }
  }
  