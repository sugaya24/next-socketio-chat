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
import { AiFillCode } from 'react-icons/ai';
import { MdHomeWork, MdSportsHockey, MdFoodBank, MdPets } from 'react-icons/md';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { BiCameraMovie, BiBookOpen } from 'react-icons/bi';
import { FaPlane } from 'react-icons/fa';

const Sidebar = () => {
  const router = useRouter();

  const roomHandler = (room: string) => {
    router.push(`/room/[roomId]`, `/room/${room}`);
  };

  const bg = useColorModeValue(`gray.100`, `gray.900`);

  const ROOMS = [
    {
      name: `programming`,
      icon: <AiFillCode />,
    },
    {
      name: `job`,
      icon: <MdHomeWork />,
    },
    {
      name: `music`,
      icon: <BsMusicNoteBeamed />,
    },
    {
      name: `movies`,
      icon: <BiCameraMovie />,
    },
    {
      name: `books`,
      icon: <BiBookOpen />,
    },
    {
      name: `travel`,
      icon: <FaPlane />,
    },
    {
      name: `sports`,
      icon: <MdSportsHockey />,
    },
    {
      name: `food`,
      icon: <MdFoodBank />,
    },
    {
      name: `pets`,
      icon: <MdPets />,
    },
  ];

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
