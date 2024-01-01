export type TVehicleMake = {
    id: number;
    make: string;
};

/**
 * @param key - Make ID
 */
export type TVehicleModels = {
    [key: number]: TVehicleModel;
};

export type TVehicleModel = {
    id: number;
    make_id: number;
    label: string;
    year: number;
    category: string
};

/**
 * @param key - Model ID
 */
export type TVehicleYears = {
    [key: number]: {
        [key: string]: TVehicleYear[];
    };
};

export type TVehicleYear = {
    id: number;
    make_id: number;
    year: number;
};