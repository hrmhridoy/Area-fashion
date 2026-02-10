// Netlify Edge Functions - Optional Advanced Routing
// https://docs.netlify.com/edge-functions/overview/

// This file shows example edge function patterns
// Uncomment and use as needed for advanced use cases

// Example: Redirect /old-url to /new-url
// export default async (request) => {
//   const url = new URL(request.url);
//   if (url.pathname === '/old-url') {
//     return new Response(null, {
//       status: 301,
//       headers: { Location: '/new-url' },
//     });
//   }
//   return;
// };

// Example: Add security headers
// export default async (request) => {
//   const response = await fetch(request);
//   const newHeaders = new Headers(response.headers);
//   newHeaders.set('X-Custom-Header', 'custom-value');
//   return new Response(response.body, {
//     status: response.status,
//     statusText: response.statusText,
//     headers: newHeaders,
//   });
// };

// Example: Redirect based on user location
// export default async (request) => {
//   const country = request.headers.get('x-country') || 'US';
//   const url = new URL(request.url);
//   
//   if (url.pathname === '/shop' && country === 'GB') {
//     return new Response(null, {
//       status: 302,
//       headers: { Location: '/shop?region=gb' },
//     });
//   }
//   return;
// };
