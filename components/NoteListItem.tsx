import React, {useState, useEffect} from 'react';
import DeleteNoteButton from './DeleteNoteButton';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useNotes, Note} from '../contexts/NotesContext';

interface NavigationParams {}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
  noteId: string;
  noteBody: string;
}
const NoteListItem: React.FC<Props> = ({navigation, noteId, noteBody}) => {
  const [showDelete, setShowDelete] = useState(false);
  const {deleteNote, isAddingANewNote} = useNotes();

  const getNotePreview = (body: string): string => {
    const preview = [];
    for (let i = 0; i < 50; i++) {
      preview.push(body[i]);
    }

    return preview.join('');
  };

  useEffect(() => {
    if (isAddingANewNote) {
      setShowDelete(false);
    }
  });

  return (
    <TouchableOpacity
      style={styles.wrap}
      onLongPress={() => setShowDelete((prevState) => !prevState)}
      onPress={() => {
        setShowDelete(false);
        navigation.navigate('Note', {id: noteId});
      }}
      delayLongPress={1000}>
      <Text style={styles.text}>{getNotePreview(noteBody)}</Text>
      {showDelete && (
        <DeleteNoteButton
          setShowDelete={setShowDelete}
          navigation={navigation}
          noteId={noteId}
        />
      )}
    </TouchableOpacity>
  );
};

export default NoteListItem;

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  wrap: {
    borderWidth: 1,
    borderColor: 'red',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
