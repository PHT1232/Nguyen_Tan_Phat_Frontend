import { RetailGetAllDto } from "./RetailGetAllDto";

// import { ProductGetAllDto } from "./ProductGetAllDto";
export interface IRetailGetAllPagedResultDto {
    items: RetailGetAllDto[] | undefined;
    totalCount: number;
}

export class RetailGetAllPagedResultDto implements IRetailGetAllPagedResultDto {
    items: RetailGetAllDto[] | undefined;
    totalCount: number;

    constructor(data?: IRetailGetAllPagedResultDto) {
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
                    this.items.push(RetailGetAllDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): RetailGetAllPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new RetailGetAllPagedResultDto();
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

    clone(): RetailGetAllPagedResultDto {
        const json = this.toJSON();
        let result = new RetailGetAllPagedResultDto();
        result.init(json);
        return result;
    }
}
