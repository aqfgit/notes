import React, {useContext, useState, useEffect} from 'react';

type NotesContextType = {};

const NotesContext = React.createContext<NotesContextType | undefined>(
  undefined,
);

export const useNotes = () => {
  return useContext(NotesContext);
};

export const NotesProvider: React.FC = ({children}) => {
  const value = {};

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
