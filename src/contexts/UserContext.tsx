import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IUserContext {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  uuid: string;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState(`John Doe`);
  const value: IUserContext = {
    username,
    setUsername,
    uuid: uuidv4(),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
