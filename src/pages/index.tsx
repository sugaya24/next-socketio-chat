import React, { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Heading, Input } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react';
import Message from '@/models/Message';
import { postData } from '@/lib/postData';

export interface IMessage {
  username: string;
  messageText: string;
  id?: string;
  roomId: string;
  createdAt?: string;
  updatedAt?: string;
  imageSrc?: string;
}

const Home = ({ msg }: any) => {
  const [socket, _] = useState(() => io());
  const router = useRouter();
  // const { roomId } = router.query;
  const roomId = `home`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>(``);
  const [messages, setMessages] = useState<IMessage[]>(msg);
  const [username, setUsername] = useState<string>(`anonymous`);
  const { data: session } = useSession();

  useEffect((): any => {
    socket.on(`connect`, () => {
      socket.emit(`join`, roomId);
      setConnected(true);
    });
    socket.on(`message`, (data: IMessage) => {
      console.log(`send message`);
      setMessages((prev) => [
        ...prev,
        {
          username: data.username,
          messageText: data.messageText,
          roomId: roomId,
        },
      ]);
    });
  }, []);

  useEffect(() => {
    if (session?.user?.name) {
      setUsername(session!.user!.name);
    }
  }, [session]);

  const sendMessage = (messageText: string) => {
    if (!messageText) return;
    const message = {
      messageText,
      username,
      roomId,
    };
    socket.emit(`message`, message, roomId);
    postData(message);
    setMessageText(``);
    inputRef?.current?.focus();
  };

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

      <Container h={`100%`} w={100} display={`flex`} flexDir={`row`}>
        <Box w={`30%`} h={`100%`} mr={`4`}>
          <Sidebar />
        </Box>

        <Box w={`70%`}>
          <Heading>Next.js + Socket.io Chat App</Heading>
          <Input
            ref={inputRef}
            value={messageText}
            disabled={!connected}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === `Enter`) {
                sendMessage(messageText);
              }
            }}
          />
          <Button onClick={() => sendMessage(messageText)}>SEND</Button>
          {messages.length ? (
            messages.map((message, i) => (
              <Box key={i}>
                {message.username}: {message.messageText}
              </Box>
            ))
          ) : (
            <Box>messages don&apos;t exist yet.</Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/messages`);
  const msg = await res.json();
  return { props: { msg: msg.data } };
}

export default Home;
