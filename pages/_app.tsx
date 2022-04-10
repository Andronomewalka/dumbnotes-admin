import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'GlobalStyle';
import { InfoStakProvider } from 'components/InfoStack';
import InfoStack from 'components/InfoStack/InfoStack';
import { useCSRF } from 'hooks/useCSRF';

function MyApp({ Component, pageProps }: AppProps) {
  useCSRF();
  return (
    <ThemeProvider theme={theme}>
      <InfoStakProvider>
        <GlobalStyle />
        <Component {...pageProps} />
        <InfoStack />
      </InfoStakProvider>
    </ThemeProvider>
  );
}

export default MyApp;
