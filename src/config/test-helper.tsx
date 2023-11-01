import { SearchProvider } from "@/context/search-context";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

export const defineProperty = (propertyName: string)=> {
    Object.defineProperty(window, propertyName, {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });    
}

export function renderWithClient(client: QueryClient, ui: React.ReactElement) {
    const { rerender, ...result } = render(
        <SearchProvider>
            <QueryClientProvider client={client}>
                <MantineProvider>
                    {ui}
                </MantineProvider>
            </QueryClientProvider>
        </SearchProvider>
    );
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <SearchProvider>
                    <QueryClientProvider client={client}>
                        <MantineProvider>
                            {rerenderUi}
                        </MantineProvider>
                    </QueryClientProvider>
                </SearchProvider>
            ),
    };
}