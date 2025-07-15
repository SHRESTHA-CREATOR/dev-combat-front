// frontend/pages/_app.tsx

import '../styles/globals.css'; // make sure this path is correct
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
