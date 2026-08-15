import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);

// Fase 35 — Papan Mandor tahan sinyal hilang: service worker menyimpan kerangka aplikasi
// supaya mandor tetap bisa membuka/menyegarkan aplikasi di lokasi tanpa sinyal. Strategi
// network-first (lihat public/service-worker.js) sehingga versi online selalu yang terbaru.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {
      /* offline shell hanyalah lapis tambahan; aplikasi tetap jalan tanpanya */
    });
  });
}
