import Sidebar from '@/components/Sidebar';
import { Box, Button, Container, Heading, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Message } from '..';
import { useSession } from 'next-auth/react';

const RoomPage = () => {
  const [socket, _] = useState(() => io());
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>(`anonymous`);
  const [messageText, setMessageText] = useState<string>(``);
  const [connected, setConnected] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { roomId } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    socket.on(`connect`, () => {
      setConnected(true);
    });

    socket.on(`message`, (data: Message) => {
      setMessages((prev) => [
        ...prev,
        {
          username: data.username,
          messageText: data.messageText,
        },
      ]);
    });
  }, []);

  useEffect(() => {
    if (!roomId) return;
    socket.emit(`join`, roomId);
    // load messages
    setMessages([]);
  }, [roomId]);

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
    setMessageText(``);
    inputRef?.current?.focus();
  };

  return (
    <Container h={`100%`} display={`flex`} flexDir={`row`}>
      <Box h={`100%`} w={`30%`} mr={`4`}>
        <Sidebar />
      </Box>

      <Box h={`100%`} w={`70%`}>
        <Heading>Room: {roomId}</Heading>
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
  );
};

export default RoomPage;
