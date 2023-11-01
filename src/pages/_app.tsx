import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchProvider } from '@/context/search-context';

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <SearchProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </SearchProvider>
  );
}

export default MyApp;