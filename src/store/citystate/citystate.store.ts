import { create } from "zustand";

type ILocation = {
    id: number;
    name: string;
}

type ILocationCountry = ILocation & {
    code: string;
}

export type ILocationCity = {
    [countryId: number]: ILocation;
}

type Store = {
    CountryList: ILocationCountry[]
    CityList: ILocationCity[];

    setCountryList: (CountryList: ILocationCountry[]) => void;
    setCityList: (CityList: ILocationCity[]) => void;
}

export const useCityStateStore = create<Store>()((set) => ({
    CountryList: [],
    CityList: [],

    setCountryList: (CountryList: ILocationCountry[]) => set({ CountryList }),
    setCityList: (CityList: ILocationCity[]) => set({ CityList }),
}));