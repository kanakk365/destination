// // frontend-app2/app/sso-receiver/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SSORecieverPage() {
//   // const = useState('Waiting for token...');
//   const router = useRouter();

//   // IMPORTANT: Replace with the actual domain of your first application
//   const FIRST_APP_ORIGIN = 'https://competitor-hub-frontend.vercel.app'; // [3]

//   useEffect(() => {
//     const handleMessage = async (event: MessageEvent) => {
//       // ALWAYS validate the origin of the message for security [3, 4, 5, 6]
//       if (event.origin!== FIRST_APP_ORIGIN) {
//         console.warn('Message received from untrusted origin:', event.origin);
//         // setStatus('Received message from untrusted source.');
//         return;
//       }

//       // Validate the message data structure
//       if (event.data && event.data.token) {
//         const receivedToken = event.data.token;
//         // setStatus('Token received. Storing...');

//         try {
//           // Call this app's own API route to set the HttpOnly cookie [1, 2]
//           const response = await fetch('/api/set-sso-token', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ token: receivedToken }),
//           });

//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail || 'Failed to store token.');
//           }

//           // setStatus('Token stored successfully. Redirecting to dashboard...');
//           // Redirect the top-level window (the user's main browser tab)
//           // This is crucial for the user to navigate to the protected content on app2.
//           // if (window.top) {
//           //   window.top.location.href = '/dashboard'; // Redirect to a protected page on app2
//           // }
//         } catch (error: any) {
//           console.error('Error storing token:', error);
//           // setStatus(`Error: ${error.message}`);
//         }
//       } else {
//         // setStatus('Received invalid message format.');
//         console.log("Invalid format")
//       }
//     };

//     // Add event listener for messages [3, 4, 5]
//     window.addEventListener('message', handleMessage);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('message', handleMessage);
//     };
//   }, [router]);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>SSO Receiver</h1>
//       {/* <p>{status}</p> */}
//       {/* This page is typically invisible to the user as it's in an iframe */}
//     </div>
//   );
// }


// frontend-app2/app/sso-receiver/page.tsx
'use client';

import { useEffect } from 'react';

export default function SSORecieverPage() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === "https://competitor-hub-frontend.vercel.app") {
        const token = event.data.token;
        if (token) {
          localStorage.setItem("sso_token", token);
          
          // document.cookie = `jwt=${token}; path=/; secure`;
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