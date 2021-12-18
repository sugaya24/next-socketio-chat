import React, { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Heading, Input } from '@chakra-ui/react';
import { io } from 'socket.io-client';

interface IMsg {
  user: string;
  msg: string;
}

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>(``);
  const [user, setUser] = useState<string>(`anonymous`);

  useEffect((): any => {
    const socket = io({ path: `/api/socketio` });
    socket.on(`connect`, () => {
      console.log(`SOCKET CONNECTED!`, socket.id);
      setConnected(true);
    });

    socket.on(`message`, (message: IMsg) => {
      chat.push(message);
      setChat([...chat]);
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      const message: IMsg = {
        user,
        msg,
      };

      const res = await fetch(`/api/chat`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify(message),
      });

      if (res.ok) setMsg(``);
    }

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
        <Input value={user} onChange={(e) => setUser(e.target.value)} />
        <Input
          ref={inputRef}
          value={msg}
          disabled={!connected}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === `Enter`) {
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage}>SEND</Button>
        {chat.length ? (
          chat.map((chat, i) => (
            <Box key={i}>
              {chat.user}: {chat.msg}
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
