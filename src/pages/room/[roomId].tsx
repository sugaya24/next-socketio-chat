import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { UserContext } from '@/contexts/UserContext';
import Message from '@/components/Message';
import Sidebar from '@/components/Sidebar';
import InputForm from '@/components/Input';
import { postData } from '@/lib/postData';
import { getAsString } from '@/lib/getAsString';
import { IMessage } from '..';
import { Box, Divider, Heading, HStack, Text } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';
import { io } from 'socket.io-client';
import generatedItems from '@/lib/groupByDays';
import moment from 'moment';
import Head from 'next/head';

const RoomPage = ({ msg }: any) => {
  const [socket, _] = useState(() => io());
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[]>(msg);
  const { username, setUsername, uuid } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState<string>(
    `https://i.pravatar.cc/150?u=${uuid}`,
  );
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
    <>
      <Head>
        <title>{`#${roomId}`}</title>
      </Head>

      <Box
        h={`calc(100% - 64px)`}
        w={`100%`}
        display={`grid`}
        gridTemplateColumns={{ base: `1fr`, md: `300px auto` }}
        gridTemplateRows={`100%`}
      >
        <Box
          display={{ base: `none`, md: `block` }}
          h={`100%`}
          maxW={`300px`}
          className={`sidebar`}
        >
          <Sidebar />
        </Box>

        <Box
          className={`main-content`}
          display={`flex`}
          flexDir={`column`}
          h={`100%`}
        >
          <Box className={`heading`} display={`flex`} alignItems={`center`}>
            <Box m={`4`}>
              <FaHashtag size={`24px`} />
            </Box>
            <Heading>{roomId}</Heading>
          </Box>
          <Box className={`message-list`} overflowY={`auto`} flex={`1`}>
            {messages.length ? (
              generatedItems(messages).map((message, i) => {
                if (!message.type) {
                  return (
                    <Box key={i} mx={`4`} mb={`6`}>
                      <Message
                        username={message.username}
                        messageText={message.messageText}
                        createdAt={message.createdAt}
                        imageSrc={message.imageSrc}
                      />
                    </Box>
                  );
                } else {
                  return (
                    <HStack mx={`4`} mb={`6`}>
                      <Divider />
                      <Box>
                        <Text
                          whiteSpace={`nowrap`}
                          color={`GrayText`}
                          fontSize={`sm`}
                          mx={`2`}
                        >
                          {moment(message.date).format(`dddd, MMMM D, YYYY`)}
                        </Text>
                      </Box>
                      <Divider />
                    </HStack>
                  );
                }
              })
            ) : (
              <Box m={`4`}>messages don&apos;t exist yet.</Box>
            )}
            <div ref={scrollBottomRef} />
          </Box>
          <Box w={`100%`} p={`2`} display={`flex`}>
            <InputForm
              inputRef={inputRef}
              messageText={messageText}
              connected={connected}
              sendMessage={sendMessage}
              setMessageText={setMessageText}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const roomId = context.params.roomId;
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/messages/${roomId}`);
  const msg = await res.json();
  return { props: { msg: msg.data } };
}

export default RoomPage;
