import '../styles/global.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    white: {
      main: '#ffffff',
    },
  },
});

axios.defaults.baseURL = "http://localhost:8443"

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
