import { Box, Button, Container, Heading, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Message } from '..';

const RoomPage = () => {
  const [socket, _] = useState(() => io());
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>(`anonymous`);
  const [messageText, setMessageText] = useState<string>(``);
  const [connected, setConnected] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { roomId } = router.query;

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
  }, [roomId]);

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
    <Container>
      <Heading>Room: {roomId}</Heading>
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
            {message.username}: {message.messageText}@{roomId}
          </Box>
        ))
      ) : (
        <Box>messages don&apos;t exist yet.</Box>
      )}
    </Container>
  );
};

export default RoomPage;
