import { CountryItemProps } from '@/interfaces/country'
import { Tooltip } from '@mantine/core'
import Link from 'next/link'
import React, { ReactElement } from 'react'

/**
 * Returns an item for the list of Countries with a link to see the Country Details
 * @param country ICountry
 * @returns ReactElement
 */
function CountryListItem({ country }: CountryItemProps): ReactElement {
    const { id, officialName } = country
    return (
        <Link href={{ pathname: `/country/${id}/about` }}>
            <Tooltip label="Click to see all the details" color='#fff' bg={'#1A3C4C'}>
                <li key={id}>
                    {officialName}
                </li>
            </Tooltip>
        </Link>
    )
}

export default CountryListItem