import { StructureGetallDto } from "../Structure/StructureGetallDto";

export interface IStructureGetAllPagedResultDto {
    items: StructureGetallDto[] | undefined;
    totalCount: number;
}

export class StructureGetAllPagedResultDto implements IStructureGetAllPagedResultDto {
    items: StructureGetallDto[] | undefined;
    totalCount: number;

    constructor(data?: IStructureGetAllPagedResultDto) {
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
                    this.items.push(StructureGetallDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): StructureGetAllPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new StructureGetAllPagedResultDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        data["totalCount"] = this.totalCount;
        return data;
    }

    clone(): StructureGetAllPagedResultDto {
        const json = this.toJSON();
        let result = new StructureGetAllPagedResultDto();
        result.init(json);
        return result;
    }
}