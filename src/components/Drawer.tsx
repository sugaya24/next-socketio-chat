import { ROOMS } from '@/lib/roomsData';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  List,
  ListItem,
  Spacer,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

const DrawerSidebar = ({ onClose, isOpen }: any) => {
  return (
    <>
      <Drawer placement={`left`} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <HStack>
              <Heading>Rooms</Heading>
              <Spacer />
              <AiFillCloseCircle onClick={onClose} cursor={`pointer`} />
            </HStack>
          </DrawerHeader>
          <DrawerBody onClick={onClose}>
            <List>
              {ROOMS.map((room) => (
                <ListItem key={room.name} my={`4`} cursor={`pointer`}>
                  <Link href={`/room/${room.name}`} passHref>
                    <HStack>
                      {room.icon}
                      <Text>{room.name}</Text>
                    </HStack>
                  </Link>
                </ListItem>
              ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerSidebar;
