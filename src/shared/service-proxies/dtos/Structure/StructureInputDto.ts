export interface IStructureInputDto {
    unitCode: string;
    unitName: string;
    address: string;
    levelOfUnit: string;
    unitOf: string;
    businessRN: number;
    issuedDate: Date;
    issuedPlace: string;
}

export class StructureInputDto implements IStructureInputDto {
    unitCode: string;
    unitName: string;
    address: string;
    levelOfUnit: string;
    unitOf: string;
    businessRN: number;
    issuedDate: Date;
    issuedPlace: string;

    constructor(data?: IStructureInputDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.unitCode = _data["unitCode"];
            this.unitName = _data["unitName"];
            this.address = _data["address"];
            this.levelOfUnit = _data["levelOfUnit"];
            this.unitOf = _data["unitOf"];
            this.businessRN = _data["businessRN"];
            this.issuedDate = _data["issuedDate"];
            this.issuedPlace = _data["issuedPlace"];
        }
    }

    static fromJS(data: any): StructureInputDto {
        data = typeof data === 'object' ? data : {};
        let result = new StructureInputDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["unitCode"] = this.unitCode;
        data["unitName"] = this.unitName;
        data["address"] = this.address;
        data["levelOfUnit"] = this.levelOfUnit;
        data["unitOf"] = this.unitOf;
        data["businessRN"] = this.businessRN;
        data["issuedDate"] = this.issuedDate;
        data["issuedPlace"] = this.issuedPlace;
        return data;
    }
}
