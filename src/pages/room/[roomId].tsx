import Sidebar from '@/components/Sidebar';
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { IMessage } from '..';
import { useSession } from 'next-auth/react';
import { postData } from '@/lib/postData';
import { getAsString } from '@/lib/getAsString';
import { FaHashtag } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import Message from '@/components/Message';
import { v4 as uuidv4 } from 'uuid';

const RoomPage = ({ msg }: any) => {
  const [socket, _] = useState(() => io());
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[]>(msg);
  const [username, setUsername] = useState<string>(`anonymous`);
  const [UID, setUID] = useState<string>(uuidv4());
  const [imageSrc, setImageSrc] = useState<string>(
    `https://avatars.dicebear.com/api/open-peeps/${UID}.svg`,
  );
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

    socket.on(`message`, (data: IMessage) => {
      setMessages((prev) => [
        ...prev,
        {
          username: data.username,
          messageText: data.messageText,
          roomId: getAsString(roomId!),
          imageSrc: data.imageSrc,
        },
      ]);
    });
    scrollBottomRef.current?.scrollIntoView();
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
    if (session?.user?.image) {
      setImageSrc(session.user.image);
    }
  }, [session]);

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: `smooth` });
  }, [messages]);

  const sendMessage = (messageText: string) => {
    if (!messageText) return;
    const message = {
      messageText,
      username,
      roomId: getAsString(roomId!),
      imageSrc,
    };
    socket.emit(`message`, message, roomId);
    postData(message);
    setMessageText(``);
    inputRef?.current?.focus();
  };

  return (
    <Box h={`calc(100% - 63px)`} maxW={`100%`} display={`flex`} flexDir={`row`}>
      <Box h={`100%`} w={`30%`} className={`sidebar`}>
        <Sidebar />
      </Box>

      <Box
        className={`main-content`}
        display={`flex`}
        flexDir={`column`}
        h={`100%`}
        w={`70%`}
      >
        <Box className={`heading`} display={`flex`} alignItems={`center`}>
          <Box p={`2`}>
            <FaHashtag size={`24px`} />
          </Box>
          <Heading>{roomId}</Heading>
        </Box>
        <Box className={`message-list`} overflowY={`auto`} flex={`1`}>
          {messages.length ? (
            messages.map((message, i) => (
              <Box key={i} mx={`4`} my={`6`}>
                <Message
                  username={message.username}
                  messageText={message.messageText}
                  createdAt={message.createdAt}
                  imageSrc={message.imageSrc}
                />
              </Box>
            ))
          ) : (
            <Box>messages don&apos;t exist yet.</Box>
          )}
          <div ref={scrollBottomRef} />
        </Box>
        <Box w={`100%`} p={`2`} display={`flex`}>
          <InputGroup>
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
            <InputRightAddon onClick={() => sendMessage(messageText)}>
              <BiSend />
            </InputRightAddon>
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context: any) {
  const roomId = context.params.roomId;
  const res = await fetch(`http://localhost:3000/api/messages/${roomId}`);
  const msg = await res.json();
  return { props: { msg: msg.data } };
}

export default RoomPage;
