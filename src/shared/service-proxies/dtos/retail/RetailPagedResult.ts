import { RetailProductDto } from "./RetailProductDto";

export interface IRetailPagedResult {
    items: RetailProductDto[] | undefined;
    totalCount: number;
}

  export class RetailPagedResult
  implements IRetailPagedResult
{
  items: RetailProductDto[] | undefined;
  totalCount: number;

  constructor(data?: IRetailPagedResult) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [] as any;
        for (let item of _data["items"])
          this.items.push(RetailProductDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }

  static fromJS(data: any): RetailPagedResult {
    data = typeof data === "object" ? data : {};
    let result = new RetailPagedResult();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }

  clone(): RetailPagedResult {
    const json = this.toJSON();
    let result = new RetailPagedResult();
    result.init(json);
    return result;
  }
}