export class ProductTopSalesList {
    items?: ProductTopSales[] | undefined;

  constructor(data?: ProductTopSalesList) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  static fromJS(data: any): ProductTopSalesList {
    data = typeof data === "object" ? data : {};
    const result = new ProductTopSalesList();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.items = data["items"];
    }
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["items"] = this.items;
    return data;
  }
}

export class ProductTopSales {
    productCode: string;
    productName: string;
    productQuantity: string;
    productSales: string;

    constructor(data?: ProductTopSales) {
        if (data) {
          for (var property in data) {
            if (data.hasOwnProperty(property))
              (<any>this)[property] = (<any>data)[property];
          }
        }
      }
    
      init(_data: any) {
        if (_data) {
          this.productCode = _data["productCode"];
          this.productName = _data["productName"];
          this.productQuantity = _data["productQuantity"];
          this.productSales = _data["productSales"];
        }
      }
    
      static fromJS(data: any): ProductTopSales {
        data = typeof data === "object" ? data : {};
        let result = new ProductTopSales();
        result.init(data);
        return result;
      }
    
      toJSON(data?: any) {
        data = typeof data === "object" ? data : {};
        data["productCode"] = this.productCode;
        data["productName"] = this.productName;
        data["productQuantity"] = this.productQuantity;
        data["productSales"] = this.productSales;
        return data;
      }
    
      clone(): ProductTopSales {
        const json = this.toJSON();
        let result = new ProductTopSales();
        result.init(json);
        return result;
      }
}