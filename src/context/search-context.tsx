import { ICountry, ICountryHashed } from "@/interfaces/country";
import { createContext } from "react";

// Turns the results into a Hashmap, having constant time when retrieving the element
const countries: ICountryHashed = {}

// Context API for the search Countries

/**
 * Add a Country for the cached Country Hashmap 
 * @returns void
 */
const appendCountry = (obj: ICountry[]): void => {
    obj.forEach((i: ICountry) => {
        if (!countries[i.id]) countries[i.id] = i
    })
    sessionStorage.setItem("countries", JSON.stringify(countries))
}

/**
 * Returns the list of cached Countries
 * @returns ICountryHashed
 */
const getCountries = (name?: string): ICountry => {
    const cached = sessionStorage.getItem("countries") || ''
    const obj = JSON.parse(cached) || countries
    
    return name ? obj[name] : obj
}

export const SearchContext = createContext({ getCountries, appendCountry })

export const SearchProvider = ({ children }: any) => {
    const val = { getCountries, appendCountry }
    return <SearchContext.Provider value={val}>{children}</SearchContext.Provider>
}