import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 750,
      lg: 1025,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: "#6366F1",
      dark: "#008AC0",
    },
    grey: {
      A100: "#fcfcfc",
      A200: "#f4f4f4",
    },
    text: {
      primary: "#11142D",
      secondary: "#808191",
    },
  },
  typography: {
    fontFamily: " 'Manrope', sans-serif",

    h1: {
      fontSize: "25px",
      fontWeight: 700,
      lineHeight: "34px",
      color: "#11142D",
    },
    h3: {
      fontSize: "22px",
      fontWeight: 600,
      lineHeight: "30px",
      color: "#11142D",
    },
    h4: {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "24px",
      color: "#11142D",
    },
    h5: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "24px",
      color: "#11142D",
    },
    h6: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "24px",
      color: "#11142D",
    },
    body1: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",
      color: "#11142D",
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px",
      color: "#808191",
    },
    subtitle1: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
      color: "#11142D",
    },
    subtitle2: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
      color: "#808191",
    },
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.08)",
    "0px 1px 5px rgba(0, 0, 0, 0.08)",
    "0px 1px 8px rgba(0, 0, 0, 0.08)",
    "0px 1px 10px rgba(0, 0, 0, 0.08)",
    "0px 1px 14px rgba(0, 0, 0, 0.08)",
    "0px 1px 18px rgba(0, 0, 0, 0.08)",
    "0px 2px 16px rgba(0, 0, 0, 0.08)",
    "0px 3px 14px rgba(0, 0, 0, 0.08)",
    "0px 3px 16px rgba(0, 0, 0, 0.08)",
    "0px 4px 18px rgba(0, 0, 0, 0.08)",
    "0px 4px 20px rgba(0, 0, 0, 0.08)",
    "0px 5px 22px rgba(0, 0, 0, 0.08)",
    "0px 5px 24px rgba(0, 0, 0, 0.08)",
    "0px 5px 26px rgba(0, 0, 0, 0.08)",
    "0px 6px 28px rgba(0, 0, 0, 0.08)",
    "0px 6px 30px rgba(0, 0, 0, 0.08)",
    "0px 6px 32px rgba(0, 0, 0, 0.08)",
    "0px 7px 34px rgba(0, 0, 0, 0.08)",
    "0px 7px 36px rgba(0, 0, 0, 0.08)",
    "0px 8px 38px rgba(0, 0, 0, 0.08)",
    "0px 8px 40px rgba(0, 0, 0, 0.08)",
    "0px 8px 42px rgba(0, 0, 0, 0.08)",
    "0px 9px 44px rgba(0, 0, 0, 0.08)",
    "0px 9px 46px rgba(0, 0, 0, 0.08)",
  ],

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },
  },
});
