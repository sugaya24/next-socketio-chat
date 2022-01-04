import { AppProps } from 'next/app';
// import '@/styles/global.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';
import UserContextProvider from '@/contexts/UserContext';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
