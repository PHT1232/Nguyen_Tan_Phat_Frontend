export interface ICMNDDto {
    soCMND: string;
    ngayCap: string;
    noiCap: string;
    quocTich: string;
  }
  
  export class CMNDDto implements ICMNDDto {
    soCMND: string;
    ngayCap: string;
    noiCap: string;
    quocTich: string;
  
    constructor(data?: ICMNDDto) {
      if (data) {
        for (var property in data) {
          if (data.hasOwnProperty(property))
            (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  
    init(_data?: any) {
      if (_data) {
        this.soCMND = _data["soCMND"];
        this.ngayCap = _data["ngayCap"];
        this.noiCap = _data["noiCap"];
        this.quocTich = _data["quocTich"];
      }
    }
  
    static fromJS(data: any): CMNDDto {
      data = typeof data === 'object' ? data : {};
      let result = new CMNDDto();
      result.init(data);
      return result;
    }
  
    toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["soCMND"] = this.soCMND;
      data["ngayCap"] = this.ngayCap;
      data["noiCap"] = this.noiCap;
      data["quocTich"] = this.quocTich;
      return data;
    }
  
    clone(): CMNDDto {
      const json = this.toJSON();
      let result = new CMNDDto();
      result.init(json);
      return result;
    }
  }
  