import * as moment from 'moment';

export interface IListProductGetAll {
    productCode: string;
    productName: string;
    productImage: string;
    categoryName: string;
    price: number;
    unit: string;
    quantity: number;
    inventoryStatus: string;
    products: ProductGetAllDto[];
    creationTime: moment.Moment;
    lastDateModified: moment.Moment;
    username: string;
}

export interface IProductGetAllDto {
    productCode: string;
    productName: string;
    productImage: string;
    categoryName: string;
    storageCode: string;
    price: number;
    unit: string;
    quantity: number;
    inventoryStatus: string;
    creationTime: moment.Moment;
    lastDateModified: moment.Moment;
    username: string;
}

export class ProductGetAllDto implements IProductGetAllDto {
    productCode: string;
    productName: string;
    productImage: string;
    imageToShow: any;
    categoryName: string;
    storageCode: string;
    price: number;
    unit: string;
    quantity: number;
    inventoryStatus: string;
    creationTime: moment.Moment;
    lastDateModified: moment.Moment;
    username: string;

    constructor(data?: IProductGetAllDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data: any) {
        if (_data) {
            this.productCode = _data["productCode"];
            this.productName = _data["productName"];
            this.productImage = _data["productImage"];
            this.categoryName = _data["categoryName"];
            this.storageCode = _data["storageCode"];
            this.price = _data["price"];
            this.unit = _data["unit"];
            this.quantity = _data["quantity"];
            this.inventoryStatus = _data["inventoryStatus"];
            this.creationTime = _data["creationTime"];
            this.lastDateModified = _data["lastDateModified"];
            this.username = _data["username"];
        }
    }

    static fromJS(data: any): ProductGetAllDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProductGetAllDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["productCode"] = this.productCode;
        data["productName"] = this.productName;
        data["productImage"] = this.productImage;
        data["categoryName"] = this.categoryName;
        data["storageCode"] = this.storageCode;
        data["price"] = this.price;
        data["unit"] = this.unit;
        data["quantity"] = this.quantity;
        data["inventoryStatus"] = this.inventoryStatus;
        data["creationTime"] = this.creationTime;
        data["lastDateModified"] = this.lastDateModified;
        data["username"] = this.username;
        return data;
    }

    clone(): ProductGetAllDto {
        const json = this.toJSON();
        let result = new ProductGetAllDto();
        result.init(json);
        return result;
    }
}

export class ListProductGetAll implements IListProductGetAll {
    productCode: string;
    productName: string;
    productImage: string;
    imageToShow: any;
    categoryName: string;
    products: ProductGetAllDto[];
    price: number;
    unit: string;
    quantity: number;
    inventoryStatus: string;
    creationTime: moment.Moment;
    lastDateModified: moment.Moment;
    username: string;

    constructor(data?: IListProductGetAll) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data: any) {
        if (_data) {
            this.productCode = _data["productCode"];
            this.productName = _data["productName"];
            this.productImage = _data["productImage"];
            this.products = _data["products"];
            this.categoryName = _data["categoryName"];
            this.price = _data["price"];
            this.unit = _data["unit"];
            this.quantity = _data["quantity"];
            this.inventoryStatus = _data["inventoryStatus"];
            this.creationTime = _data["creationTime"];
            this.lastDateModified = _data["lastDateModified"];
            this.username = _data["username"];
        }
    }

    static fromJS(data: any): ListProductGetAll {
        data = typeof data === 'object' ? data : {};
        let result = new ListProductGetAll();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["productCode"] = this.productCode;
        data["productName"] = this.productName;
        data["productImage"] = this.productImage;
        data["categoryName"] = this.categoryName;
        data["products"] = this.products;
        data["price"] = this.price;
        data["unit"] = this.unit;
        data["quantity"] = this.quantity;
        data["inventoryStatus"] = this.inventoryStatus;
        data["creationTime"] = this.creationTime;
        data["lastDateModified"] = this.lastDateModified;
        data["username"] = this.username;
        return data;
    }

    clone(): ListProductGetAll {
        const json = this.toJSON();
        let result = new ListProductGetAll();
        result.init(json);
        return result;
    }
}