import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import { useDebounce } from "./useDebounce"

// Inserts essential config for the useQuery (queryclient provider)
const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    })

    // eslint-disable-next-line react/display-name
    return ({ children }: any) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
/**
 * Test useDebounce Hook (basic test...)
 */
describe("Hook - useDebounce", ()=> {
    it("Should return correct value after debounce function", async () => {
        const { result } = renderHook(() => useDebounce('testing', 1), {
            wrapper: createWrapper()
        })
    
        await waitFor(() => {
            expect(result.current).toBe('testing')
        })
    })
})