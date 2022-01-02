import React from 'react';
import {
  Box,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ROOMS } from '@/lib/roomsData';

const Sidebar = () => {
  const router = useRouter();

  const roomHandler = (room: string) => {
    router.push(`/room/[roomId]`, `/room/${room}`);
  };

  const bg = useColorModeValue(`gray.100`, `gray.900`);

  return (
    <Box h={`100%`} bg={bg}>
      <Heading as={`h4`} p={`4`} size={`lg`}>
        Rooms
      </Heading>
      <List>
        {ROOMS.map((room) => (
          <ListItem
            key={room.name}
            mx={`4`}
            my={`4`}
            onClick={() => roomHandler(room.name)}
            cursor={`pointer`}
          >
            <HStack>
              {room.icon}
              <Text>{room.name}</Text>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
