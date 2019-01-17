import { createMuiTheme } from '@material-ui/core/styles';

import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: cyan[800], // #00838F
      main: cyan[600], // #00acc1
      dark: cyan[400], // #26C6DA
    },
    secondary: {
      light: red[400], // #EF9A9A
      main: '#ee6e73',
      dark: '#cf6367',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
      text: {
        color: '#666',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
      },
      textPrimary: {
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
      textSecondary: {
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme;
