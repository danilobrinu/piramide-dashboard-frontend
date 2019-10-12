import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

export function AppStateProvider({ initialState, reducer, children }) {
  const value = useReducer(reducer, initialState);
  return <AppContext.Provider value={value} children={children} />;
}

export function useAppState() {
  return useContext(AppContext);
}
