import { Loader, TextInput } from '@mantine/core'
import Image from 'next/image'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import CountryList from './country-list'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@tanstack/react-query'
import { SearchContext } from '@/context/search-context'
import { errorMessages } from '@/config/error-messages'

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
        <div className="search-wrapper justify-center">
            <Image
                width={100}
                height={60}
                className={'md:absolute'}
                src="https://visto.ai/wp-content/uploads/2019/10/wide_logo.svg"
                alt="Logo"
            />
            <h1 className="text-3xl text-center">
                Search Countries
            </h1>
            <h2 className="text-center mb-4">
                Type a name of a Country and see it&apos;s all details
            </h2>

            <TextInput
                className="mb-10"
                placeholder="(the letter case will be ignored)"
                onChange={(e) => setSearch(e.currentTarget.value)}
            />

            {data && data.length && <CountryList search={search} countries={data} />}
            {isLoading && <div className="justify-center items-center flex flex-1">
                <Loader size={25} color={'#ACCEE2'} />
            </div>
            }
            {isError && <p className="text-gray-600 text-center">{error.message}</p>}
        </div>
    )
}

export default SearchArea