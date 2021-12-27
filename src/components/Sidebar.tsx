import React from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const roomHandler = (room: string) => {
    router.push(`/room/${room}`);
  };

  const bg = useColorModeValue(`gray.200`, `gray.700`);

  const ROOMS = [
    {
      name: `List1`,
    },
    {
      name: `List2`,
    },
    {
      name: `List3`,
    },
  ];

  return (
    <Box h={`100%`} bg={bg}>
      <Heading as={`h2`}>Rooms</Heading>
      <List>
        {ROOMS.map((room) => (
          <ListItem
            key={room.name}
            m={`2`}
            onClick={() => roomHandler(room.name)}
            cursor={`pointer`}
          >
            {room.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
