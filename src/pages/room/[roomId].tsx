import Sidebar from '@/components/Sidebar';
import { Box, Button, Container, Heading, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { IMessage } from '..';
import { useSession } from 'next-auth/react';
import { postData } from '@/lib/postData';
import { getAsString } from '@/lib/getAsString';

const RoomPage = ({ msg }: any) => {
  const [socket, _] = useState(() => io());
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[]>(msg);
  const [username, setUsername] = useState<string>(`anonymous`);
  const [messageText, setMessageText] = useState<string>(``);
  const [connected, setConnected] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { roomId } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    socket.on(`connect`, () => {
      socket.emit(`join`, roomId);
      setConnected(true);
    });

    socket.on(`message`, (data: IMessage) => {
      setMessages((prev) => [
        ...prev,
        {
          username: data.username,
          messageText: data.messageText,
          roomId: getAsString(roomId!),
        },
      ]);
    });
  }, []);

  useEffect(() => {
    if (!roomId) return;
    socket.emit(`join`, roomId);
    // load messages
    setMessages(msg);
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
      roomId: getAsString(roomId!),
    };
    socket.emit(`message`, message);
    postData(message);
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

export async function getServerSideProps(context: any) {
  const roomId = context.params.roomId;
  const res = await fetch(`http://localhost:3000/api/messages/${roomId}`);
  const msg = await res.json();
  return { props: { msg: msg.data } };
}

export default RoomPage;
