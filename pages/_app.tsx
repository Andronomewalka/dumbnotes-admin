import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from 'GlobalStyle';
import { InfoStakProvider } from 'components/InfoStack';
import InfoStack from 'components/InfoStack/InfoStack';

function MyApp({ Component, pageProps }: AppProps) {
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
