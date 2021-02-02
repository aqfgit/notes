import React from 'react';
import {Button, StyleSheet, View, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useNotes, Note} from '../contexts/NotesContext';
import NoteListItem from './NoteListItem';

type Navigation = NavigationScreenProp<NavigationState>;

interface Props {
  navigation: Navigation;
}
const ViewAllNotes: React.FC<Props> = ({navigation}) => {
  const {notes, setIsAddingANewNote} = useNotes();

  return (
    <View style={styles.wrap}>
      {console.log(notes)}
      <TouchableOpacity>
        <Button
          title="Add a new note"
          onPress={() => {
            setIsAddingANewNote(true);
            navigation.navigate('Note', {id: null});
          }}
          color="blue"
        />
      </TouchableOpacity>
      {notes &&
        notes.map((note: Note) => {
          return (
            <NoteListItem
              key={note.id}
              navigation={navigation}
              noteId={note.id}
              noteBody={note.body}
            />
          );
        })}
    </View>
  );
};

export default ViewAllNotes;

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 5,
    borderColor: 'green',
    flex: 1,
    flexDirection: 'column',
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});
