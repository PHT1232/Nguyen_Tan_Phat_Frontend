export interface IStructureGetallDto {
    unitCode: string;
    unitName: string;
    address: string;
    levelOfUnit: string;
    creationTime: Date;
    lastDateModified: Date;
    username: string;
}

export class StructureGetallDto implements IStructureGetallDto {
    unitCode: string;
    unitName: string;
    address: string;
    levelOfUnit: string;
    creationTime: Date;
    lastDateModified: Date;
    username: string;

    constructor(data?: IStructureGetallDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data: any) {
        if (_data) {
            this.unitCode = _data["unitCode"];
            this.unitName = _data["unitName"];
            this.address = _data["address"];
            this.levelOfUnit = _data["levelOfUnit"];
            this.creationTime = _data["creationTime"];
            this.lastDateModified = _data["lastDateModified"];
            this.username = _data["username"];
        }
    }

    static fromJS(data: any): StructureGetallDto {
        data = typeof data === 'object' ? data : {};
        let result = new StructureGetallDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["unitCode"] = this.unitCode;
        data["unitName"] = this.unitName;
        data["address"] = this.address;
        data["levelOfUnit"] = this.levelOfUnit;
        data["creationTime"] = this.creationTime;
        data["lastDateModified"] = this.lastDateModified;
        data["username"] = this.username;
        return data;
    }

    clone(): StructureGetallDto {
        const json = this.toJSON();
        let result = new StructureGetallDto();
        result.init(json);
        return result;
    }
}

