import '../styles/globals.css'
import createEmotionCache from '../src/lib/createEmotionCache'
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../src/assets/theme'
import CssBaseline from '@mui/material/CssBaseline'

const clientSideEmotionCache = createEmotionCache();

function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component  {...pageProps} />
      </ThemeProvider >
    </CacheProvider>
  )



}

export default App
