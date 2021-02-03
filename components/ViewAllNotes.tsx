import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useNotes, Note} from '../contexts/NotesContext';
import NoteListItem from './NoteListItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const {notes, deleteNote} = useNotes();

  useEffect(() => {
    if (notes.length === notesSelectedForDelete.length) {
      setAllNotesSelectedForDelete(true);
    }
  }, [
    notes.length,
    notesSelectedForDelete.length,
    setAllNotesSelectedForDelete,
  ]);

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
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={() => {
              navigation.navigate('Note', {id: null});
            }}>
            <Icon name="add" size={30} style={styles.icon} color="blue" />
            <Text style={styles.buttonText}>New note</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => {
              allNotesSelectedForDelete
                ? unselectAllNotesForDelete()
                : selectAllNotesForDelete();
            }}
            style={styles.button}>
            <Icon
              name={allNotesSelectedForDelete ? 'filter-none' : 'add-to-photos'}
              size={20}
              style={styles.icon}
              color="blue"
            />
            <Text style={styles.buttonText}>
              {allNotesSelectedForDelete ? 'Unselect all' : 'Select all'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              notesSelectedForDelete.forEach((id) => {
                deleteNote(id);
              });
              setNotesSelectedForDelete([]);
              setIsDeletingNotesFromList(false);
              setAllNotesSelectedForDelete(false);
            }}
            disabled={notesSelectedForDelete.length === 0}
            style={styles.button}>
            <Icon name="delete" size={20} style={styles.icon} color="blue" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
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
      {console.log('NOTES LENGTH ', notes.length)}
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
  addNoteButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    zIndex: 2,
  },
  icon: {
    paddingRight: 0,
    paddingVertical: 0,
    alignSelf: 'center',
    zIndex: 4,
  },
  selectButton: {},
  button: {
    flex: 0,
    flexDirection: 'column',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    zIndex: 2,
    flex: 0,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 13,
  },
});
