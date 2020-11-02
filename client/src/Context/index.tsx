import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext({});

export default ({ children }: { children: React.ReactNode }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
