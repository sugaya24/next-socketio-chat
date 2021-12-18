import {
  Box,
  Center,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';

export default function SmallCentered() {
  return (
    <Box
      bg={useColorModeValue(`gray.50`, `gray.900`)}
      color={useColorModeValue(`gray.700`, `gray.200`)}
    >
      <Box
        borderTopWidth={1}
        borderStyle={`solid`}
        borderColor={useColorModeValue(`gray.200`, `gray.700`)}
      >
        <Container
          as={Stack}
          maxW={`6xl`}
          py={4}
          direction={{ base: `column`, md: `row` }}
          spacing={4}
          justify={{ base: `center`, md: `space-between` }}
          align={{ base: `center`, md: `center` }}
        >
          <Center w={`100%`}>
            <Text>© 2021 Yuki Sugaya All rights reserved</Text>
          </Center>
        </Container>
      </Box>
    </Box>
  );
}
