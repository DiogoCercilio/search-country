import { CountryListProps, ICountry } from '@/interfaces/country'
import CountryListItem from './country-list-item'
import { ReactElement } from 'react'

/**
 * Returns a formatted list of Countries
 * @param country ICountry
 * @param search string
 * @returns ReactElement
 */
function CountryList({ countries, search }: CountryListProps): ReactElement {
    return (
        <div>
            <p className="mt-4 mb-8">Showing results for <em><strong>{search}</strong></em>:</p>
            <ul className="list-countries">
                {countries?.length ?
                    countries.map((country: ICountry) => 
                        <CountryListItem key={country.id} country={country} />
                    )
                    :
                    <li>No countries found :(</li>
                }
            </ul>
        </div>
    )
}

export default CountryList