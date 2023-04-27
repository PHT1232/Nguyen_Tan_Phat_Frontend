export interface IStructureSelectList {
  items: StructureSelectDto[] | undefined;
}

export class StructureSelectList implements IStructureSelectList {
  items: StructureSelectDto[] | undefined;

  constructor(data?: IStructureSelectList) {
    if (data) {
      this.items = data.items;
    }
  }

  init(_data: any) {
    if (_data) {
      this.items = _data["items"];
    }
  }

  static fromJS(data: any): StructureSelectList {
    data = typeof data === "object" ? data : {};
    let result = new StructureSelectList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["items"] = this.items;
    return data;
  }

  clone(): StructureSelectList {
    const json = this.toJSON();
    let result = new StructureSelectList();
    result.init(json);
    return result;
  }
}

export interface IStructureSelectDto {
  unitCode: string;
  unitName: string;
}

export class StructureSelectDto implements IStructureSelectDto {
  unitCode: string;
  unitName: string;

  constructor(data?: IStructureSelectDto) {
    if (data) {
      this.unitCode = data.unitCode;
      this.unitName = data.unitName;
    }
  }

  init(_data: any) {
    if (_data) {
      this.unitCode = _data["unitCode"];
      this.unitName = _data["unitName"];
    }
  }

  static fromJS(data: any): StructureSelectDto {
    data = typeof data === "object" ? data : {};
    let result = new StructureSelectDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["unitCode"] = this.unitCode;
    data["unitName"] = this.unitName;
    return data;
  }

  clone(): StructureSelectDto {
    const json = this.toJSON();
    let result = new StructureSelectDto();
    result.init(json);
    return result;
  }
}
