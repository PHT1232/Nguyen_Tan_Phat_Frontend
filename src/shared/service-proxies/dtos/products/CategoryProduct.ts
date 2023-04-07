export interface ICategoryProduct {
    CategoryId: string;
    CategoryName: string;
}

export class CategoryProduct implements ICategoryProduct {
    CategoryId: string;
    CategoryName: string;

    constructor(data?: ICategoryProduct) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data: any) {
        if (_data) {
            this.CategoryId = _data["categoryId"];
            this.CategoryName = _data["categoryName"];
        }
    }

    static fromJS(data: any): CategoryProduct {
        data = typeof data === 'object' ? data : {};
        let result = new CategoryProduct();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["categoryId"] = this.CategoryId;
        data["categoryName"] = this.CategoryName;
        return data;
    }

    clone(): CategoryProduct {
        const json = this.toJSON();
        let result = new CategoryProduct();
        result.init(json);
        return result;
    }
}
