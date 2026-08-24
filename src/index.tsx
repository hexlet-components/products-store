import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./locales/index";

import "@mantine/core/styles.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Клиент создаётся на запуск приложения, а не модульным синглтоном: иначе кеш
// переживал бы перезапуск и утекал между прогонами.
const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </BrowserRouter>,
);
