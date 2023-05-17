import { ExpensesGetAllDto } from "../expenses/ExpensesGetAllDto";

export interface IExpensesGetAllPagedResultDto {
  items: ExpensesGetAllDto[] | undefined;
  totalCount: number;
}

export class ExpensesGetAllPagedResultDto
  implements IExpensesGetAllPagedResultDto
{
    items: ExpensesGetAllDto[] | undefined;
    totalCount: number;

    constructor(data?: IExpensesGetAllPagedResultDto) {
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
                    this.items.push(ExpensesGetAllDto.fromJS(item));
            }
            this.totalCount = _data["totalCount"];
        }
    }

    static fromJS(data: any): ExpensesGetAllPagedResultDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExpensesGetAllPagedResultDto();
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

    clone(): ExpensesGetAllPagedResultDto {
        const json = this.toJSON();
        let result = new ExpensesGetAllPagedResultDto();
        result.init(json);
        return result;
    }
}
