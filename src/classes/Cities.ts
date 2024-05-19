class Cities {
    protected citiesByCountry = {
        0: {
            0: 'Vilnius',
            1: 'Kaunas',
            2: 'Klaipėda',
            3: 'Šiauliai',
            4: 'Panevežys',
            5: 'Alytus',
            6: 'Marijampolė',
            7: 'Mažeikiai',
            8: 'Jonava',
            9: 'Utena',
            10: 'Kėdainiai',
            11: 'Telšiai',
            12: 'Visaginas',
            13: 'Tauragė',
            14: 'Ukmergė',
            15: 'Plungė',
            16: 'Kretinga',
            17: 'Šilutė',
            18: 'Radviliškis',
            19: 'Palanga',
            20: 'Druskininkai',
            21: 'Grigiškės',
            22: 'Jurbarkas',
            23: 'Biržai',
            24: 'Rokiškis',
            25: 'Elektrėnai',
            26: 'Kursenai',
            27: 'Garliava',
            28: 'Joniškis',
            29: 'Vilkaviškis',
            30: 'Kaišiadorys',
            31: 'Šakiai',
            32: 'Varėna',
            33: 'Kelmė',
            34: 'Švenčionys',
            35: 'Prienai',
            36: 'Kalvarija',
            37: 'Anykščiai',
            38: 'Pabradė',
            39: 'Naujoji akmene',
            40: 'Pandėlys',
            41: 'Rūdiškės',
            42: 'Širvintos',
            43: 'Šalčininkai',
            44: 'Lazdijai',
            45: 'Veisiejai',
            46: 'Trakai',
            47: 'Švenčionėliai',
        }
    };

    public getCityByIndex(countryId: number, cityIndex: number) {
        return this.citiesByCountry[countryId as keyof typeof this.citiesByCountry][cityIndex as keyof typeof this.citiesByCountry];
    };

    public getCitiesByCountry(countryId: number) {
        return this.citiesByCountry[countryId as keyof typeof this.citiesByCountry];
    };
};

export default new Cities;