import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const primary = {
  main: "#00a996"
};

const theme = createMuiTheme({
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
