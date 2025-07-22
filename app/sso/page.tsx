// pages/sso-login.tsx
"use client";

import { useEffect } from "react";

export default function SSOSlave() {
  useEffect(() => {
    // Let parent know we're ready
    window.parent.postMessage("ready", "*");

    // Listen for token
    const handler = (event: MessageEvent) => {
      if (event.origin === "https://competitor-hub-frontend.vercel.app" && event.data?.token) {
        const token = event.data.token;

        // Save token to localStorage (or cookies)
        localStorage.setItem("sso_token", token);

        // You could also verify token here via backend
        console.log("SSO Token received:", token);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return <div>SSO Processing...</div>;
}
