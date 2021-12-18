import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box className={`layout`} h={`100vh`} display={`flex`} flexDir={`column`}>
      <Navbar />
      <Box flex={`1 0 auto`}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
