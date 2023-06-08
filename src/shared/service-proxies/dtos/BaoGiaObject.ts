import { ExportImportProductDto } from '../service-proxies';

export interface IBaoGiaObject {
    products: string[];
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    date: string;
  }
  
  export class BaoGiaObject implements IBaoGiaObject {
    products: string[];
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    date: string;
  
    constructor(data?: IBaoGiaObject) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property))
            (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.products = _data["products"];
        this.customerName = _data["customerName"];
        this.customerAddress = _data["customerAddress"];
        this.customerPhone = _data["customerPhone"];
        this.date = _data["date"];
      }
    }
  
    static fromJS(data: any): BaoGiaObject {
      data = typeof data === 'object' ? data : {};
      let result = new BaoGiaObject();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["products"] = this.products;
      data["customerName"] = this.customerName;
      data["customerAddress"] = this.customerAddress;
      data["customerPhone"] = this.customerPhone;
      data["date"] = this.date;
      return data;
    }
  
    clone(): BaoGiaObject {
      const json = this.toJSON();
      let result = new BaoGiaObject();
      result.init(json);
      return result;
    }
  }
  