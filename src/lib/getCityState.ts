import { Country, City } from "country-state-city";

export const getCityState = () => {
    const CountryList = Country.getAllCountries().map((country, idx) => ({ id: idx, name: country.name, code: country.isoCode }));
    const CityList: { [countryId: number]: { id: number; name: string; }[] } = {};
    CountryList.forEach((country, idx) => {
        CityList[idx] = City.getCitiesOfCountry(country.code)?.map((city, idx) => ({ id: idx, name: city.name })) ?? [];
    });

    return {
        Countries: CountryList,
        Cities: CityList
    }
}