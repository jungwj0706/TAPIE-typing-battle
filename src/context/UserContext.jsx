import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [name, setName] = useState(() => localStorage.getItem('tb_name') || '');
  const [mode, setMode] = useState(() => localStorage.getItem('tb_mode') || 'word');
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    localStorage.setItem('tb_name', name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem('tb_mode', mode);
  }, [mode]);

  const value = { name, setName, mode, setMode, playerId, setPlayerId };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext };
