import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';
import '@mantine/core/styles.css';

const MyApp = ({ Component, pageProps }: any) => {
  return (
        <MantineProvider>
          <Component {...pageProps} />
        </MantineProvider>
  );
}

export default MyApp;