import { ReactElement, useEffect, useState } from 'react'

/**
 * Debouncing an action
 */
export const useDebounce = (value: any, delay: any)=> {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(()=> {
        const handler = setTimeout(()=> {
            setDebouncedValue(value)
        }, delay)
        return ()=> clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}