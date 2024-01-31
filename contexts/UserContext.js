import React, {createContext, useState} from 'react';

export const UserContext = createContext(null);

const UserContextProvider = ({children}) => {
  const [email, setEmail] = useState(null);

  return (
    <UserContext.Provider value={{email, setEmail}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
