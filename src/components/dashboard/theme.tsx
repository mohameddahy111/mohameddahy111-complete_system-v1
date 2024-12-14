"use client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { blueGrey, grey, indigo, orange } from "@mui/material/colors";
import * as React from "react";

export interface IThemeProps {
  children: React.ReactNode;
}

export default function Theme({ children }: IThemeProps) {
  const theme = createTheme({
    typography: {
      h1: {
        color: blueGrey[700],
        fontSize: "2rem",
        fontWeight: 800,
        textTransform: "capitalize",
      },
      body1:{
        color: grey[600],
      }
    },
    palette: {
      primary: {
        main: indigo[400]
      },
      secondary: {
        main: "#fff"
      }
    },
    
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
