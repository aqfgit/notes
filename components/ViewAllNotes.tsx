import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useNotes, Note} from '../contexts/NotesContext';
import NoteListItem from './NoteListItem';

type Navigation = NavigationScreenProp<NavigationState>;

interface Props {
  navigation: Navigation;
  setIsDeletingNotesFromList: (newState: boolean) => void;
  isDeletingNotesFromList: boolean;
  notesSelectedForDelete: string[];
  setNotesSelectedForDelete: (newState: string[]) => void;
  allNotesSelectedForDelete: boolean;
  setAllNotesSelectedForDelete: (newState: boolean) => void;
}
const ViewAllNotes: React.FC<Props> = ({
  navigation,
  setIsDeletingNotesFromList,
  isDeletingNotesFromList,
  notesSelectedForDelete,
  setNotesSelectedForDelete,
  allNotesSelectedForDelete,
  setAllNotesSelectedForDelete,
}) => {
  const {notes, setIsAddingANewNote} = useNotes();

  const selectAllNotesForDelete = () => {
    setAllNotesSelectedForDelete(true);
    setNotesSelectedForDelete(notes.map((note) => note.id));
  };

  const unselectAllNotesForDelete = () => {
    setAllNotesSelectedForDelete(false);
    setNotesSelectedForDelete([]);
  };

  return (
    <View style={styles.wrap}>
      {!isDeletingNotesFromList ? (
        <TouchableOpacity style={styles.button}>
          <Button
            title="New Note"
            onPress={() => {
              setIsAddingANewNote(true);
              navigation.navigate('Note', {id: null});
            }}
            color="blue"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button}>
          <Button
            title={allNotesSelectedForDelete ? 'Unselect all' : 'Select all'}
            onPress={() => {
              allNotesSelectedForDelete
                ? unselectAllNotesForDelete()
                : selectAllNotesForDelete();
            }}
            color="blue"
          />
        </TouchableOpacity>
      )}
      {console.log('NOTES SELECTED FOR DELETE', notesSelectedForDelete.length)}
      {notes && (
        <FlatList
          data={notes}
          renderItem={({item}) => (
            <NoteListItem
              key={item.id}
              navigation={navigation}
              noteId={item.id}
              noteBody={item.body}
              noteCreatedAt={item.dateCreated}
              setIsDeletingNotesFromList={setIsDeletingNotesFromList}
              isDeletingNotesFromList={isDeletingNotesFromList}
              allNotesSelectedForDelete={allNotesSelectedForDelete}
              notesSelectedForDelete={notesSelectedForDelete}
              setNotesSelectedForDelete={setNotesSelectedForDelete}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default ViewAllNotes;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 25,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    zIndex: 2,
  },
});
