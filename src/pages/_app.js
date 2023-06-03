import '@/component/styles/globals.css'
import { AuthProvider } from './authcontext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}