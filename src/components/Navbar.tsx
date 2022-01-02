import Link from 'next/link';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import { BsChatRightDotsFill } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa';
import DrawerSidebar from './Drawer';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: session } = useSession();

  const LoginHandler = () => {
    if (session) {
      return <MenuItem onClick={() => signOut()}>Logout</MenuItem>;
    } else {
      return <MenuItem onClick={() => signIn()}>Login</MenuItem>;
    }
  };

  return (
    <>
      <Box bg={useColorModeValue(`gray.100`, `gray.900`)} px={4}>
        <DrawerSidebar onClose={onClose} isOpen={isOpen} />
        <Flex h={16} alignItems={`center`} justifyContent={`space-between`}>
          <Box display={{ base: `block`, md: `none` }}>
            <IconButton
              aria-label="show rooms"
              icon={<FaArrowLeft />}
              onClick={onOpen}
            />
          </Box>

          <Link href={`/`} passHref>
            <HStack cursor={`pointer`}>
              <Icon as={BsChatRightDotsFill} boxSize={`6`} />
              <Heading display={{ base: `none`, md: `block` }}>
                Chat App
              </Heading>
            </HStack>
          </Link>

          <Flex alignItems={`center`}>
            <Stack direction={`row`} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === `light` ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={`full`}
                  variant={`link`}
                  cursor={`pointer`}
                  minW={0}
                >
                  <Avatar
                    size={`sm`}
                    src={
                      session?.user?.image
                        ? session?.user.image
                        : `https://avatars.dicebear.com/api/male/username.svg`
                    }
                  />
                </MenuButton>
                <MenuList alignItems={`center`}>
                  <br />
                  <Center>
                    <Avatar
                      size={`2xl`}
                      src={
                        session?.user?.image
                          ? session?.user.image
                          : `https://avatars.dicebear.com/api/male/username.svg`
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <LoginHandler />
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
