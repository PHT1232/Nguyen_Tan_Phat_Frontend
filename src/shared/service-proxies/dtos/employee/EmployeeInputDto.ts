import { BankAccount } from "../BankAccount";
import { CMNDDto } from "./CMNDDto";

export interface IEmployeeInputDto {
    employeeCode: string;
    employeeName: string;
    employeeGender: string;
    employeeDateOfBirth: Date;
    employeeCMND: CMNDDto;
    jobTitle: string;
    workUnit: string;
    taxIdentification: string;
    phoneNumber: number;
    employeeSalary: number;
    employeeAllowance: number;
    salaryFactor: number;
    typeOfContract: string;
    employeeBankAccount: BankAccount;
  }
  
  export class EmployeeInputDto implements IEmployeeInputDto {
    employeeCode: string;
    employeeName: string;
    employeeGender: string;
    employeeDateOfBirth: Date;
    employeeCMND: CMNDDto;
    phoneNumber: number;
    jobTitle: string;
    workUnit: string;
    taxIdentification: string;
    employeeSalary: number;
    employeeAllowance: number;
    salaryFactor: number;
    typeOfContract: string;
    employeeBankAccount: BankAccount;
  
    constructor(data?: IEmployeeInputDto) {
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
        this.phoneNumber = data["phoneNumber"];
        this.jobTitle = data["jobTitle"];
        this.workUnit = data["workUnit"];
        this.taxIdentification = data["taxIdentification"];
        this.employeeSalary = data["employeeSalary"];
        this.employeeAllowance = data["employeeAllowance"];
        this.salaryFactor = data["salaryFactor"];
        this.typeOfContract = data["typeOfContract"];
        this.employeeBankAccount = data["employeeBankAccount"];
      }
    }
  
    static fromJS(data: any): EmployeeInputDto {
      data = typeof data === 'object' ? data : {};
      let result = new EmployeeInputDto();
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
      data["phoneNumber"] = this.phoneNumber;
      data["jobTitle"] = this.jobTitle;
      data["workUnit"] = this.workUnit;
      data["taxIdentification"] = this.taxIdentification;
      data["employeeSalary"] = this.employeeSalary;
      data["employeeAllowance"] = this.employeeAllowance;
      data["salaryFactor"] = this.salaryFactor;
      data["typeOfContract"] = this.typeOfContract;
      data["employeeBankAccount"] = this.employeeBankAccount;
      return data;
    }
  }
  