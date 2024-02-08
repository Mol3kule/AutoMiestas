import { Prisma } from "@prisma/client";

export type MileageType = 'km' | 'mi';
export type PowerType = 'hp' | 'kw';

/**
 * @param id - Database ID
 * @param make - Make name
 * @param type - Supported vehicle types `(e.g. [0, 1, 2])`
 */
export type TVehicleMake = {
    id: number;
    make: string;
    type: number[];
};

/**
 * @param key - Make ID
 */
export type TVehicleModels = { [key: number]: Array<TVehicleModel> };

/**
 * @param id - Database ID
 * @param make_id - Make ID from `make` table
 * @param model - Model name
 * @param type - Supported vehicle types `(e.g. [0, 1, 2])`
 */
export type TVehicleModel = {
    id: number;
    make_id: number;
    model: string;
    type: Prisma.JsonArray;
};