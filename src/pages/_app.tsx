import { AppProps } from 'next/app';
// import '@/styles/global.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
