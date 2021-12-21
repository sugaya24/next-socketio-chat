import React, { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Heading, Input } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';

export interface Message {
  username: string;
  messageText: string;
  id?: string;
}

const Home = () => {
  const [socket, _] = useState(() => io());
  const router = useRouter();
  const roomId = `home`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>(``);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>(`anonymous`);

  useEffect((): any => {
    socket.on(`connect`, () => {
      socket.emit(`join`, roomId);
      setConnected(true);
    });
    socket.on(`message`, (data: Message) => {
      console.log(`send message`);
      setMessages((prev) => [
        ...prev,
        {
          username: data.username,
          messageText: data.messageText,
        },
      ]);
    });
  }, []);

  const sendMessage = (messageText: string) => {
    if (!messageText) return;
    const message = {
      messageText,
      username,
    };
    socket.emit(`message`, message, roomId);
    setMessageText(``);
    inputRef?.current?.focus();
  };

  return (
    <div>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Heading>Next.js + Socket.io Chat App</Heading>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
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
      </Container>
    </div>
  );
};

export default Home;
