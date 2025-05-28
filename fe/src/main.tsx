import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { appTheme } from "./theme.ts";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
