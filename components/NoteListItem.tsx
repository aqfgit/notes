import React, {useState, useEffect} from 'react';
import DeleteNoteButton from './DeleteNoteButton';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useNotes} from '../contexts/NotesContext';

type Navigation = NavigationScreenProp<NavigationState>;

interface Props {
  navigation: Navigation;
  noteId: string;
  noteBody: string;
}
const NoteListItem: React.FC<Props> = ({navigation, noteId, noteBody}) => {
  const [showDelete, setShowDelete] = useState(false);
  const {isAddingANewNote} = useNotes();

  const getNotePreview = (body: string): string => {
    const preview = [];
    const characterLimit = 35;
    for (let i = 0; i < characterLimit; i++) {
      preview.push(body[i]);
    }

    return body.length > characterLimit
      ? preview.join('').concat('...')
      : preview.join('');
  };

  useEffect(() => {
    if (isAddingANewNote) {
      setShowDelete(false);
    }
  }, [isAddingANewNote]);

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
    fontSize: 16,
  },
  wrap: {
    borderBottomWidth: 1,
    padding: 15,
    borderColor: 'grey',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
