import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Node } from 'react-native-reanimated';

export interface Note {
  id: string,
  body: string;
  dateCreated: Date;
}

type NotesContextType = {
  notes: Note[],
  isAddingANewNote: boolean,
  setIsAddingANewNote: (newState: boolean) => void,
  addNote: (body: string, dateCreated: Date) => Promise<string | null>,
  deleteNote: (id: string) => Promise<void>,
  editNote: (id: string, newBody: string) => Promise<void>,
  getNote: (id: string) => Note,
};

const NotesContext = React.createContext<NotesContextType | undefined>(
  undefined,
);

export const useNotes = () => {
  return useContext(NotesContext);
};


export const NotesProvider: React.FC = ({children}) => {
  const [notes, setNotes] = useState<Note[] | []>([]);
  const [isAddingANewNote, setIsAddingANewNote] = useState<boolean>(false);

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

  const addNote = async (body: string, dateCreated: Date): Promise<string | null> => {
    try {
      const newNote = {id: Math.random()+'', body, dateCreated};
      const updatedNotes = (notes as Note[]).concat(newNote);
      const jsonNotes = JSON.stringify(updatedNotes)
      await AsyncStorage.setItem('notes', jsonNotes)
      setNotes(updatedNotes);
      console.log("NEWNOTEID", newNote.id)
      return newNote.id;
    } catch (error) {
      console.error(error);
      return null;
    }
    
  };

  const getNote = (id: string): Note => {
   
      const note = notes.find(note => note.id === id);
      if (note) {
        return note;
      }
      throw new Error(`Note with id of ${id} does not exist`);
    }

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
    const indexOfTheNote = notes.findIndex((note: Note) => note.id === id);
    const updatedNotes = notes.slice(0);
    try {
      updatedNotes[indexOfTheNote].body = newBody;
      const jsonNotes = JSON.stringify(updatedNotes)
      await AsyncStorage.setItem('notes', jsonNotes)
      setNotes(updatedNotes);
    } catch (error) {
      console.log("ID", id);
      console.log("index", indexOfTheNote)
      console.error(error);
    }
  }

  const value = {
    notes,
    isAddingANewNote,
    setIsAddingANewNote,
    addNote,
    deleteNote,
    editNote,
    getNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
