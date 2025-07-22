// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { appTheme } from "./theme.ts";
import { ThemeProvider } from "@mui/material/styles";
import { AppContextProvider } from "./context";
import "./translate/config.ts"
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <AppContextProvider>
      <ThemeProvider theme={appTheme}>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  // </StrictMode>
);
