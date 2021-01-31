import React, {useContext, useState, useEffect} from 'react';
import { uuid } from 'uuidv4';
import AsyncStorage from '@react-native-community/async-storage';

type NotesContextType = {};
interface Note {
  id: string,
  body: string;
  dateCreated: Date;
}

const NotesContext = React.createContext<NotesContextType | undefined>(
  undefined,
);

export const useNotes = () => {
  return useContext(NotesContext);
};


export const NotesProvider: React.FC = ({children}) => {
  const [notes, setNotes] = useState<Note[] | []>([]);

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const getDataFromAsyncStorage = async () => {
    try {
      const storageNotes = await AsyncStorage.getItem('notes');
      setNotes(storageNotes != null ? JSON.parse(storageNotes) : null);
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async ({body, dateCreated}: Note): Promise<void> => {
    try {
      const updatedNotes = [...notes, {id: uuid(), body, dateCreated}];
      const jsonNotes = JSON.stringify(updatedNotes)
      await AsyncStorage.setItem('notes', jsonNotes)
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id: string): Promise<void> => {
    try {
      const updatedNotes = notes.filter((note: Note) => note.id !== id);
      const jsonNotes = JSON.stringify(updatedNotes)
      await AsyncStorage.setItem('notes', jsonNotes)
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  }

  const editNote = async (id: string, newBody: string): Promise<void> => {
   
    try {
      const indexOfTheNote = notes.findIndex((note: Note) => note.id === id);
      const updatedNotes = notes.slice(0);
      updatedNotes[indexOfTheNote].body = newBody;
      const jsonNotes = JSON.stringify(updatedNotes)
      await AsyncStorage.setItem('notes', jsonNotes)
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  }

  const value = {
    notes,
    addNote,
    deleteNote,
    editNote
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
