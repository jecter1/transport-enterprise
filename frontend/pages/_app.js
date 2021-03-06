import '../styles/global.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import parseISO from 'date-fns/parseISO';

const theme = createTheme({
  palette: {
    white: {
      main: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "text",
        sx: {
          backgroundColor: "#2b2f40", 
          color: '#ffffff',
          textTransform: 'none'
        },
        disableElevation: true,
        disableRipple: true
      },
    },
    MuiTypography: {
      defaultProps: {
        color: '#ffffff',
        fontSize: 14
      }
    },
    DatePicker: {
      defaultProps: {
        minDate: parseISO("00010101"),
        maxDate: parseISO("99991231")
      }
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
