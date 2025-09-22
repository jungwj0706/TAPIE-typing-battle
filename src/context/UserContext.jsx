// import React, { createContext, useContext, useState, useEffect } from 'react';

// const UserContext = createContext(null);

// export function UserProvider({ children }) {
//   const [name, setName] = useState(() => localStorage.getItem('tb_name') || '');
//   const [mode, setMode] = useState(() => localStorage.getItem('tb_mode') || 'word'); // 'word' || 'sentence'
//   const [playerId, setPlayerId] = useState(null); // supabase auth uid 등 저장 예정

//   useEffect(() => {
//     localStorage.setItem('tb_name', name);
//   }, [name]);

//   useEffect(() => {
//     localStorage.setItem('tb_mode', mode);
//   }, [mode]);

//   const value = { name, setName, mode, setMode, playerId, setPlayerId };
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }

// // TODO: useUser 훅 별도 파일로 이동
// export function useUser() {
//   const ctx = useContext(UserContext);
//   if (!ctx) throw new Error('useUser must be used inside UserProvider');
//   return ctx;
// }
