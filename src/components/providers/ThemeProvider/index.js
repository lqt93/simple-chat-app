import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const primary = {
  main: "#00a996"
};

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 900,
      xl: 1200
    }
  },
  palette: {
    primary: primary
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: "white"
      }
    }
  }
});

const ThemeProvider = props => {
  return (
    <MuiThemeProvider theme={theme}>
      {React.Children.only(props.children)}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
