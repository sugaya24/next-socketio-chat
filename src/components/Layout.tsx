import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box className={`layout`}>
      <Box h={`100vh`} display={`flex`} flexDir={`column`}>
        <Navbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
