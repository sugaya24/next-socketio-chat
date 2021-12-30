import {
  Box,
  Center,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
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
