import { CountryFlagProps } from '@/interfaces/country'
import Image from 'next/image'
import React, { ReactElement } from 'react'

/**
 * Format the Country Flag, depending of the restcountries API version)
 * @param country ICountry
 * @returns string | ReactElement
 */
function Flag({ country }: CountryFlagProps): string | ReactElement {
    const { flag } = country
    if (!flag) return ''
    return !!/\.svg/.test(flag) ? <Image className="ml-3" width={30} height={30} alt="Flag" src={`${flag}`} /> : flag
}

export default Flag