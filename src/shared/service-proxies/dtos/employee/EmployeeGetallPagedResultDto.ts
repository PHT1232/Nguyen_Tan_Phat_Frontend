import { EmployeeGetAllDto } from "../employee/EmployeeGetallDto";

export interface IEmployeeGetAllPagedResultDto {
  items: EmployeeGetAllDto[] | undefined;
  totalCount: number;
}

export class EmployeeGetAllPagedResultDto
  implements IEmployeeGetAllPagedResultDto
{
    items: EmployeeGetAllDto[] | undefined;
    totalCount: number;

    constructor(data?: IEmployeeGetAllPagedResultDto) {
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
                    this.items.push(EmployeeGetAllDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): EmployeeGetAllPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new EmployeeGetAllPagedResultDto();
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

    clone(): EmployeeGetAllPagedResultDto {
        const json = this.toJSON();
        let result = new EmployeeGetAllPagedResultDto();
        result.init(json);
        return result;
    }
}
