import { Loader, TextInput } from '@mantine/core'
import Image from 'next/image'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import CountryList from './country-list'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { SearchContext } from '@/context/search-context'
import { errorMessages } from '@/config/error-messages'
import Centered from './centered'

const MIN_SEARCH_LEN = 3 // Start searching after typing three characters
const SEARCH_DELAY_MS = 500 // Debouncing time to avoid unnecessary API requests when search

/**
 * Returns a search area with a list of selected countries (if something was searched)
 * @returns ReactElement
 */
function SearchArea(): ReactElement {
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce(search, SEARCH_DELAY_MS)
    const queryKey = ['country_results', debouncedSearch]
    const getError = (statusCode: number)=> errorMessages[statusCode] || errorMessages[500]

    const queryFn = async () => {
        if (!debouncedSearch) return
        const response = await fetch(`/api/country?search=${debouncedSearch}`, { cache: 'no-cache' }).catch(err=> err)

        if(response.status !== 200) {
            throw new Error(getError(response.status))
        }
        return await response.json()
    }
    const { data, refetch, isError, error, isLoading } = useQuery({ queryKey, queryFn, enabled: false })
    const { appendCountry } = useContext(SearchContext)
    if (data) appendCountry(data)

    useEffect(() => {
        if (debouncedSearch.length > MIN_SEARCH_LEN) refetch()
    }, [debouncedSearch, refetch]);

    return (
        <div className="search-wrapper justify-center" data-testid="search-area">
            <Image
                width={100}
                height={60}
                className={'md:absolute'}
                src="https://visto.ai/wp-content/uploads/2019/10/wide_logo.svg"
                alt="Logo"
            />
            <h1 className="text-4xl text-center">
                Search Countries
            </h1>
            <h2 className="text-center mb-8 mt-2">
                Type a name of a Country and see it&apos;s all details
            </h2>

            <TextInput
                data-testid="search-area-input"
                className="mb-10"
                placeholder="(the letter case will be ignored)"
                onChange={(e) => setSearch(e.currentTarget.value)}
            />

            {(!data && !isLoading) && <Centered><p className="text-gray-400 text-center">Type something on the input above.</p></Centered>}
            {data && data.length && <CountryList search={search} countries={data} />}
            {isLoading && <Centered><Loader size={25} color={'#ACCEE2'} /></Centered>}
            {isError && <Centered><p className="text-gray-600 text-center">{error.message}</p></Centered>}
        </div>
    )
}

export default SearchArea