export interface IEmployeeSelectForAccountList {
  items: EmployeeSelectForAccount[] | undefined;
}

export class EmployeeSelectForAccountList implements IEmployeeSelectForAccountList {
  items: EmployeeSelectForAccount[] | undefined;

  constructor(data?: IEmployeeSelectForAccountList) {
    if (data) {
      this.items = data.items;
    }
  }

  init(_data: any) {
    if (_data) {
      this.items = _data["items"];
    }
  }

  static fromJS(data: any): EmployeeSelectForAccountList {
    data = typeof data === "object" ? data : {};
    let result = new EmployeeSelectForAccountList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["items"] = this.items;
    return data;
  }

  clone(): EmployeeSelectForAccountList {
    const json = this.toJSON();
    let result = new EmployeeSelectForAccountList();
    result.init(json);
    return result;
  }
}

export interface IEmployeeSelectForAccount {
    code: string;
    name: string;
}

export class EmployeeSelectForAccount implements IEmployeeSelectForAccount {
    code: string;
    name: string;

  constructor(data?: IEmployeeSelectForAccount) {
    if (data) {
      this.code = data.code;
      this.name = data.name;
    }
  }

  init(_data: any) {
    if (_data) {
      this.code = _data["code"];
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): EmployeeSelectForAccount {
    data = typeof data === "object" ? data : {};
    let result = new EmployeeSelectForAccount();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["code"] = this.code;
    data["name"] = this.name;
    return data;
  }

  clone(): EmployeeSelectForAccount {
    const json = this.toJSON();
    let result = new EmployeeSelectForAccount();
    result.init(json);
    return result;
  }
}
