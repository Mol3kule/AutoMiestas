export enum Categories { vehicle, motorcycle, heavy, agricultural, construction, trailer, boat, plane, scooter, tires_wheels, parts };

type CategoryType = { [key: number]: Categories };
type CategoryLabelType = { [key in Categories]: string };

class PostCategories {
    protected CategoryTypes: CategoryType = {
        [0]: Categories.vehicle,
        [1]: Categories.motorcycle,
        [2]: Categories.heavy,
        [3]: Categories.agricultural,
        [4]: Categories.construction,
        [5]: Categories.trailer,
        [6]: Categories.boat,
        [7]: Categories.plane,
        [8]: Categories.scooter,
        [9]: Categories.tires_wheels,
        [10]: Categories.parts
    };

    protected CategoryLabels: CategoryLabelType = {
        [Categories.vehicle]: 'vehicles',
        [Categories.motorcycle]: 'motorcycles',
        [Categories.heavy]: 'heavy',
        [Categories.agricultural]: 'agricultural',
        [Categories.construction]: 'construction',
        [Categories.trailer]: 'trailers',
        [Categories.boat]: 'boats',
        [Categories.plane]: 'planes',
        [Categories.scooter]: 'scooters',
        [Categories.tires_wheels]: 'tires_wheels',
        [Categories.parts]: 'parts'
    };

    public getLabelByIndex(objKey: Categories): string {
        return this.CategoryLabels[objKey];
    };

    public getCategories(): CategoryType {
        return this.CategoryTypes;
    };
};

export const PostObj = new PostCategories();