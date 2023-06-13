export class DatasetDtoList {
    items?: DatasetDto | undefined;

  constructor(data?: DatasetDtoList) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  static fromJS(data: any): DatasetDtoList {
    data = typeof data === "object" ? data : {};
    const result = new DatasetDtoList();
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

export class DatasetDto {
    labels: string[];
    datasets: DatasetClass[];

    constructor(data?: DatasetDto) {
        if (data) {
          for (var property in data) {
            if (data.hasOwnProperty(property))
              (<any>this)[property] = (<any>data)[property];
          }
        }
      }
    
      init(_data: any) {
        if (_data) {
          this.labels = _data["labels"];
          this.datasets = _data["datasets"];
        }
      }
    
      static fromJS(data: any): DatasetDto {
        data = typeof data === "object" ? data : {};
        let result = new DatasetDto();
        result.init(data);
        return result;
      }
    
      toJSON(data?: any) {
        data = typeof data === "object" ? data : {};
        data["labels"] = this.labels;
        data["datasets"] = this.datasets;
        return data;
      }
    
      clone(): DatasetDto {
        const json = this.toJSON();
        let result = new DatasetDto();
        result.init(json);
        return result;
      }
}

export class DatasetClass {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];

    constructor(data?: DatasetClass) {
        if (data) {
          for (var property in data) {
            if (data.hasOwnProperty(property))
              (<any>this)[property] = (<any>data)[property];
          }
        }
      }
    
      init(_data: any) {
        if (_data) {
          this.data = _data["data"];
          this.backgroundColor = _data["backgroundColor"];
          this.hoverBackgroundColor = _data["hoverBackgroundColor"];
        }
      }
    
      static fromJS(data: any): DatasetClass {
        data = typeof data === "object" ? data : {};
        let result = new DatasetClass();
        result.init(data);
        return result;
      }
    
      toJSON(data?: any) {
        data = typeof data === "object" ? data : {};
        data["data"] = this.data;
        data["backgroundColor"] = this.backgroundColor;
        data["hoverBackgroundColor"] = this.hoverBackgroundColor;
        return data;
      }
    
      clone(): DatasetClass {
        const json = this.toJSON();
        let result = new DatasetClass();
        result.init(json);
        return result;
      }
}