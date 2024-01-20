export enum Categories { vehicle, motorcycle, heavy, agricultural, construction, trailer, boat, plane, scooter, tires_wheels, parts }

type TCategoryLabels = { [key in Categories]: string };

class PostCategories {
    private categoryLabels: TCategoryLabels = {
        [Categories.vehicle]: 'vehicles',
        [Categories.motorcycle]: 'motorcycles',
        [Categories.heavy]: 'heavy',
        [Categories.agricultural]: 'agricultural',
        [Categories.construction]: 'construction',
        [Categories.trailer]: 'trailers',
        // [Categories.boat]: 'boats',
        // [Categories.plane]: 'planes',
        // [Categories.scooter]: 'scooters',
        // [Categories.tires_wheels]: 'tires_wheels',
        // [Categories.parts]: 'parts'
    };

    public getLabelByIndex(objKey: Categories): string {
        return this.categoryLabels[objKey];
    }

    public getAllCategories(): TCategoryLabels {
        return this.categoryLabels;
    }
};

export const PostObj = new PostCategories();