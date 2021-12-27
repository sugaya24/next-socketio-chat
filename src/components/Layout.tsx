import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box className={`layout`}>
      <Box h={`100vh`} display={`flex`} flexDir={`column`}>
        <Navbar />
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
