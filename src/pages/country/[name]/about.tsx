import { FC, ReactElement, useContext, useEffect, useState } from "react";
import { ICountry } from "@/interfaces/country";

import { useRouter } from "next/router";
import { SearchContext } from "@/context/search-context";
import Flag from "@/components/country-flag";
import SearchResultList from "@/components/search-result-list";
import Link from "next/link";

/**
 * Renders detailed Country Page
 * @returns ReactElement
 */
const AboutPage: FC<any> = (): ReactElement => {
  const router = useRouter()
  const [country, setCountry] = useState<ICountry>()
  const { getCountries: countries } = useContext(SearchContext)

  useEffect(() => {
    const name = router.query.name;
    if (typeof name === 'string') {
      setCountry(countries(name))
    }
  }, [router.query.name, countries])

  return (
    <main className="p-6">
      <div>
        <h1 className="text-3xl mb-4 flex">
          Country Detail
        </h1>

        <Link className="text-lime-700 mb-10 mt-4 flex" href={{ pathname: `/` }}>
          ← Back to the search page
        </Link>

        {country ?
          <>
            <h2 className="text-2xl mb-4 flex text-gray-600">
              {country?.officialName} {<Flag country={country} />}
            </h2>
            <SearchResultList country={country} />
          </>
          :
          'No Country selected...'
        }
      </div>
    </main>
  )
}

export default AboutPage;