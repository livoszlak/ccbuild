import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { DataProvider } from "./contexts/DataContext.jsx";
import { ThemeProvider, createTheme } from "@mui/material";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON
);

let theme = createTheme({
  palette: {
    secondary: {
      main: "#488ac6",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DataProvider>
  </StrictMode>
);
