import { ICountry2, ICountry3, ICountry } from "@/interfaces/country"

/**
 * @description Normalize API results, independently of the "restcountries" api version (v2, v3)
 * @param _countries Country2[] | ICountry3[]
 * @returns ICountry[]
 */
export const adapt = (_countries: ICountry2[] | ICountry3[]): ICountry[] => {
    return _countries.map(country=> 'maps' in country ? adaptFromV3(country) : adaptFromV2(country))
}

/**
 * 
 * @param _country ICountry3 (API results from restcountries v3)
 * @returns ICountry
 */
const adaptFromV3 = (_country: ICountry3): ICountry => {
    return {
        id: _country.cca2,
        flag: _country.flag,
        symbol: _country.cca3,
        officialName: _country.name.common,
        nativeName: _country.name.nativeName,
        currencies: Object.values(_country.currencies).map(i=> {
            return {
                name: i.name,
                symbol: i.symbol
            }
        }),
        capital: _country.capital,
        region: _country.region,
        borderingCountries: (_country.borders || []).join(', '),
        population: _country.population,
        linkToGoogleMaps: _country.maps.googleMaps
    }
}

/**
 * 
 * @param _country ICountry3 (API results from restcountries v2)
 * @returns ICountry
 */
const adaptFromV2 = (_country: ICountry2): ICountry => {
    return {
        id: _country.numericCode,
        flag: _country.flag,
        symbol: _country.alpha2Code,
        officialName: _country.name,
        nativeName: {
            'en': {
                official: _country.name,
                common: _country.name 
            },
        },
        currencies: _country.currencies.map(item=> {
            return {
                name: item.name,
                symbol: item.symbol,
            }
        }),
        capital: _country.capital,
        region: _country.region,
        borderingCountries: 'Not assigned',
        population: _country.population,
        linkToGoogleMaps: `https://www.google.com/maps/place/${_country.nativeName}`,
    }
}