import { ReadonlyURLSearchParams } from "next/navigation";

export const getUrlParams = (params: ReadonlyURLSearchParams) => {
    const paramsList = [];

    for (const key of params.keys()) {
        paramsList.push(key);
    }

    return paramsList;
}