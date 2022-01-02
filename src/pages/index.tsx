import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Center, Heading } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { postData } from '@/lib/postData';
import Sidebar from '@/components/Sidebar';
import DrawerSidebar from '@/components/Drawer';
import Message from '@/models/Message';

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
  const [username, setUsername] = useState<string>(`anonymous`);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.name) {
      setUsername(session!.user!.name);
    }
  }, [session]);

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
          <Heading>Next.js + Socket.io Chat App</Heading>
        </Center>
      </Box>
    </Box>
  );
};

export default Home;
