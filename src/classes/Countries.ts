class Countries {
    protected countries = {
        0: 'lithuania',
    }

    public getAllCountries() {
        return this.countries;
    };

    public getCountryByIndex(index: number) {
        return this.countries[index as keyof typeof this.countries];
    };
};

export default new Countries;