import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SEO from './SEO';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <HelmetProvider>
        <SEO 
          title="Kashiyatra 26"
          description="Kashiyatra, IIT Varanasi's cultural fest, blends art, music, and heritage in Varanasi"
          image="https://www.kashiyatra.org/favicon.png"
          url="https://www.kashiyatra.org"
        />
        <App />
      </HelmetProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
