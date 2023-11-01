import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import SearchArea from "./search-area";
import { QueryClient } from "@tanstack/react-query";

import { defineProperty, renderWithClient } from "@/config/test-helper";

/**
 * Necessary for emulate window properties when running tests...
 */
defineProperty('matchMedia')

/**
 * Tests Search Area Component + Search Input (Basic tests...)
 */
describe("Search Area", () => {
    it("renders a search area", () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
            },
        })
        renderWithClient(queryClient, <SearchArea />);
        
        const searchArea = screen.getByTestId("search-area")
        const searchAreaInput = screen.getByTestId("search-area-input")
        
        expect(searchArea).toBeInTheDocument();
        expect(searchArea).toHaveTextContent("Search CountriesType a name of a Country and see it's all details")
        expect(searchArea).not.toHaveValue()
        expect(searchAreaInput).toBeInTheDocument();
        expect(searchAreaInput).toHaveDisplayValue("")
    });
});