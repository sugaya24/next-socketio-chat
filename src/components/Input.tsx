import React, { useEffect } from 'react';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { BiSend } from 'react-icons/bi';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  messageText: string;
  connected: boolean;
  sendMessage: (arg0: string) => void;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
}

const InputForm = ({
  inputRef,
  messageText,
  connected,
  sendMessage,
  setMessageText,
}: Props) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, [connected]);

  return (
    <InputGroup>
      <Input
        ref={inputRef}
        value={messageText}
        disabled={!connected}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === `Enter`) {
            sendMessage(messageText);
          }
        }}
      />
      <InputRightAddon onClick={() => sendMessage(messageText)}>
        <BiSend />
      </InputRightAddon>
    </InputGroup>
  );
};

export default InputForm;
