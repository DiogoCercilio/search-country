

// Response from restcountries API V2
export interface ICountry2 {
  name: string,
  topLevelDomain: string,
  alpha2Code: string,
  alpha3Code: string,
  callingCodes: string,
  capital: string,
  altSpellings: string,
  subregion: string,
  region: string,
  population: string,
  latlng: string,
  demonym: string,
  area: string,
  gini: string,
  timezones: string,
  borders: string[],
  nativeName: string,
  numericCode: string,
  flags: string,
  currencies: Array<{
    name: string,
    symbol: string,
  }>,
  languages: string,
  translations: string,
  flag: string,
  regionalBlocs: string,
  cioc: string,
  independent: string,
}

// Response from restcountries API V3
export interface ICountry3 {
  name: {
    common: string,
    nativeName: {
      [key: string]: {
        official: string,
        common: string
      }
    }
  };
  tld: string,
  cca2: string,
  ccn3: string,
  cca3: string,
  cioc: string,
  independent: string,
  status: string,
  unMember: string,
  currencies: Array<{
    name: string,
    symbol: string,
  }>
  idd: string,
  capital: string,
  altSpellings: string,
  region: string,
  subregion: string,
  languages: string,
  translations: string,
  latlng: string,
  landlocked: string,
  borders: string[],
  area: string,
  demonyms: string,
  flag: string,
  maps: {
    googleMaps: string,
    openStreetMaps: string
  },
  population: string,
  gini: string,
  fifa: string,
  car: string,
  timezones: string,
  continents: string,
  flags: string,
  coatOfArms: string,
  startOfWeek: string,
  capitalInfo: string,
  postalCode: {
    format: string
    regex: string
  }
}

export interface ICountryHashed {
  [key: string]: ICountry;
}

export interface ICountry {
  id: string
  flag: string,
  symbol: string;
  officialName: string
  nativeName: {
    [key: string]: {
      official: string,
      common: string
    }
  }
  currencies: Array<{
    name: string,
    symbol: string,
  }>
  capital: string
  region: string
  borderingCountries: string
  population: string
  linkToGoogleMaps: string
}

// Component Props
export interface CountryItemProps {
  country: ICountry
}

export interface CountryListProps {
  countries: ICountry[]
  search: string
}

export interface CountryFlagProps {
  country: ICountry
}

export interface CountryResultProps {
  country: ICountry
}
