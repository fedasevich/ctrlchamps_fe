// i18n
import '../locales/i18n';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
// redux
import { Provider as ReduxProvider } from 'react-redux';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// redux
import { store } from '../redux/store';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// locales
import ThemeLocalization from '../locales';
// styles
import 'normalize.css';
import 'reset-css';
// components
import ThemeProvider from 'src/theme';
import { SettingsProvider } from '../components/settings';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <ThemeProvider>
              <ThemeLocalization>{getLayout(<Component {...pageProps} />)}</ThemeLocalization>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}
