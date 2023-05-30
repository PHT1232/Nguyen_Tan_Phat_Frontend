export interface ICategoryProductList {
    items: CategoryProduct[] | undefined;
}

export class CategoryProductList implements ICategoryProductList {
    items: CategoryProduct[] | undefined;

    constructor(data?: ICategoryProductList) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            if (data["items"]) {
                this.items = [] as any;
                for (let item of data["items"])
                    this.items.push(CategoryProduct.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CategoryProductList {
        data = typeof data === 'object' ? data : {};
        let result = new CategoryProductList();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (this.items && Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        return data;
    }

    clone(): CategoryProductList {
        const json = this.toJSON();
        let result = new CategoryProductList();
        result.init(json);
        return result;
    }
}

export interface ICategoryProduct {
    code: string;
    name: string;
}

export class CategoryProduct implements ICategoryProduct {
    code: string;
    name: string;

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
            this.code = _data["code"];
            this.name = _data["name"];
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
        data["code"] = this.code;
        data["name"] = this.name;
        return data;
    }

    clone(): CategoryProduct {
        const json = this.toJSON();
        let result = new CategoryProduct();
        result.init(json);
        return result;
    }
}
