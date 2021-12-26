import React from 'react';
import { Box, List, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const click = (room: string) => {
    console.log(`click`);
    router.push(`/room/${room}`);
  };

  return (
    <Box h={`100%`} bgColor={`gray.300`}>
      <List>
        <ListItem onClick={() => click(`List1`)}>List1</ListItem>
        <ListItem onClick={() => click(`List2`)}>List2</ListItem>
        <ListItem onClick={() => click(`List3`)}>List3</ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
