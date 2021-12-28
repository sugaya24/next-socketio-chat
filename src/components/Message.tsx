import React from 'react';
import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react';
import moment from 'moment';

const Message = ({ username, imageSrc, createdAt, messageText }: any) => {
  return (
    <Box>
      <HStack alignItems={`flex-start`}>
        <Image
          borderRadius={`full`}
          boxSize={`12`}
          src={imageSrc}
          alt={username}
        />
        <Box>
          <HStack>
            <Heading size={`md`} fontWeight={`semibold`}>
              {username}
            </Heading>
            <Text fontSize={`sm`} color={`GrayText`}>
              {moment(createdAt).format(`dddd, MMM. DD, hh:mm`)}
            </Text>
          </HStack>
          <Box>
            <Text>{messageText}</Text>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default Message;
