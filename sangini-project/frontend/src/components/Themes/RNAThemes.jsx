import { createTheme } from '@mui/material/styles';

const palleteColors = {
    primaryMain: '#3F414C',
    secondaryMain: '#5A5B62',
    backgroundColor: '#FFF',
    errorColor: '#d32f2f'
}



const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: palleteColors.primaryMain,
    },
    secondary: {
      main: palleteColors.secondaryMain,
    },
    error: {
      main: palleteColors.errorColor
    }
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiAppBar: {
      color: 'inherit',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: palleteColors.primaryMain,
          border: 0,
          borderRadius: 5,
          color: 'white',
          height: 40,
          padding: '0 30px',
          textTransform: 'none',
          fontSize: '14px',
          ":hover" : { backgroundColor: palleteColors.secondaryMain }
        },
      },
    },
    MuiIconButton:{
        styleOverrides:{
            root:{
                background: palleteColors.backgroundColor,
            }
        }
    },
    MuiAvatar:{
        styleOverrides:{
            root: {
                background: '#5A5B62',
            }
        }
    },
    MuiIcon:{
        styleOverrides:{
            root: {
                background: '#fff',
            }
        }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
});

export default theme;
