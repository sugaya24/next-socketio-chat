import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Center, Text, Container } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar';
import Quote from 'inspirational-quotes';

export interface IMessage {
  username: string;
  messageText: string;
  id?: string;
  roomId: string;
  createdAt?: string;
  updatedAt?: string;
  imageSrc?: string;
}

const Home = () => {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(
    null,
  );

  useEffect(() => {
    const quote = Quote.getQuote();
    setQuote(quote);
  }, []);

  return (
    <Box h={`100%`}>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        h={`100%`}
        w={`100%`}
        display={`grid`}
        gridTemplateColumns={{ base: `1fr`, md: `300px auto` }}
      >
        <Box display={{ base: `none`, md: `block` }} maxW={`300px`} h={`100%`}>
          <Sidebar />
        </Box>

        <Center>
          <Container>
            <Text textAlign={`center`}>{quote?.text}</Text>
            <Text textAlign={`center`} color={`GrayText`}>
              — {quote?.author}
            </Text>
          </Container>
        </Center>
      </Box>
    </Box>
  );
};

export default Home;
