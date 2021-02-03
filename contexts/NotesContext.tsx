import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export interface Note {
  id: string;
  body: string;
  dateCreated: string;
}

export type NotesContextType = {
  notes: Note[];
  addNote: (body: string, dateCreated: string) => Promise<string | null>;
  deleteNote: (id: string) => Promise<void>;
  editNote: (id: string, newBody: string) => Promise<void>;
  getNote: (id: string) => Note;
};

const NotesContext = React.createContext<NotesContextType>(
  {} as NotesContextType,
);

export const useNotes = (): NotesContextType => {
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
      setNotes(storageNotes != null ? JSON.parse(storageNotes) : []);
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async (
    body: string,
    dateCreated: string,
  ): Promise<string | null> => {
    try {
      const newNote = {id: Math.random() + '', body, dateCreated};
      const updatedNotes = (notes as Note[]).concat(newNote);
      const jsonNotes = JSON.stringify(updatedNotes);
      await AsyncStorage.setItem('notes', jsonNotes);
      setNotes(updatedNotes);
      return newNote.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getNote = (id: string): Note => {
    const theNote = notes.find((note) => note.id === id);
    if (theNote) {
      return theNote;
    }
    throw new Error(`Note with id of ${id} does not exist`);
  };

  const deleteNote = async (id: string): Promise<void> => {
    const getRemainingNotes = (note: Note) => note.id !== id;
    try {
      const updatedNotes = notes.filter(getRemainingNotes);
      const jsonNotes = JSON.stringify(updatedNotes);
      await AsyncStorage.setItem('notes', jsonNotes);
      setNotes((prevState) => {
        return prevState.filter(getRemainingNotes);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editNote = async (id: string, newBody: string): Promise<void> => {
    const indexOfTheNote = notes.findIndex((note: Note) => note.id === id);
    const updatedNotes = notes.slice(0);
    try {
      updatedNotes[indexOfTheNote].body = newBody;
      const jsonNotes = JSON.stringify(updatedNotes);
      await AsyncStorage.setItem('notes', jsonNotes);
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    notes,
    addNote,
    deleteNote,
    editNote,
    getNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
