import React from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyle";
import { lightTheme } from "./styles/theme";
import Router from "./routes/Router";
import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
  const theme = lightTheme;
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
