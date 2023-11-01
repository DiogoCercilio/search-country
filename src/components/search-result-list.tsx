import { CountryResultProps } from '@/interfaces/country'
import React, { ReactElement } from 'react'

/**
 * Returns a list with Country detailed information results
 * @returns ReactElement
 */
function SearchResultList({ country }: CountryResultProps): ReactElement {
    return (
        <>
            <ul className="country-results mb-8 text-gray-700 leading-8 bg-slate-50 p-4">
                <li><strong className="text-blue-gray-900">Official Name:</strong> {country.officialName}</li>
                <li><strong className="text-blue-gray-900">Native Name:</strong> {Object.values(country.nativeName).map(i => i.official)}</li>
                <li><strong className="text-blue-gray-900">Currencies:</strong> {country.currencies.map(item => `${item.symbol} (${item.name})`)}</li>
                <li><strong className="text-blue-gray-900">Capital:</strong> {country.capital}</li>
                <li><strong className="text-blue-gray-900">Region:</strong> {country.region}</li>
                <li><strong className="text-blue-gray-900">Bordering Countries:</strong> {country.borderingCountries}</li>
                <li><strong className="text-blue-gray-900">Population:</strong> {country.population}</li>
            </ul>

            <a href={country.linkToGoogleMaps} target="_blank" className="font-bold text-blue-600 hover:text-blue-300">
                Link to Google Maps
            </a>
        </>
    )
}

export default SearchResultList