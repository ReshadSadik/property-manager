import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 750,
      lg: 1025,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: "#475BE8",
      dark: "#008AC0",
    },
    grey: {
      A100: "#fcfcfc",
      A200: "#e5e5e5",
    },
    text: {
      primary: "#11142D",
      secondary: "#808191",
    },
  },
  // components :{
  //   MuiFormControl: {
  //     styleOverrides: {
  //       root: {
  //         marginBottom: '20px',
  //         '& .MuiFormLabel-root': {
  //           fontWeight: 500,
  //           fontSize: '16px',
  //           color: '#11142d',
  //           margin: '10px 0',
  //         },
  //         '& .MuiInputBase-input': {
  //           fontSize: '16px',
  //           color: '#919191',
  //         },
  //         '& .MuiSelect-select': {
  //           fontSize: '16px',
  //         },
  //         '& .MuiSelect-icon': {
  //           color: '#919191',
  //         },
  //       },
  //     },
  //   },
  //   MuiTextField: {
  //     styleOverrides: {
  //       root: {
  //         '& .MuiInputBase-input': {
  //           fontSize: '16px',
  //           color: '#919191',
  //         },
  //       },
  //     },
  //   },
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         textTransform: 'capitalize',
  //         fontSize: '16px',
  //         fontWeight: 500,
  //       },
  //     },
  //   },
  //   MuiTypography: {
  //     styleOverrides: {
  //       root: {
  //         '&.MuiTypography-colorPrimary': {
  //           color: '#11142d',
  //         },
  //       },
  //     },
  //   },
  //   MuiFormHelperText: {
  //     styleOverrides: {
  //       root: {
  //         fontWeight: 500,
  //         fontSize: '16px',
  //         color: '#11142d',
  //         margin: '10px 0',
  //       },
  //     },
  //   },

  // },
});
