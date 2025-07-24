// frontend-app2/app/sso-receiver/page.tsx
'use client';

import { useEffect } from 'react';
import { setssoToken } from '@/components/set-token';

export default function SSORecieverPage() {
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => { // Added async here
      if (event.origin === "https://competitor-hub-frontend.vercel.app") {
        const token = event.data.token;
        if (token) {
          try {
            const result = await setssoToken(token);
            console.log(result);
          } catch (error) {
            console.error('Error setting token:', error);
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Signal that iframe is ready to receive message
    window.parent.postMessage("ready", "https://competitor-hub-frontend.vercel.app");

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>SSO Receiver</h1>
      {/* This page is typically invisible to the user as it's in an iframe */}
    </div>
  );
}