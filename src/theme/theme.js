import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#6c3153',
    },
    secondary: {
      main: '#3a5db5',
    },
    error: {
      main: '#ff2828',
    },
  },
});

export default theme;
