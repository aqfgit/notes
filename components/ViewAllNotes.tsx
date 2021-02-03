import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useNotes} from '../contexts/NotesContext';
import NoteListItem from './NoteListItem';
import ControlsButton from './ControlsButton';

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
    <View style={notesListStyles.wrap}>
      {!isDeletingNotesFromList ? (
        <View style={notesListStyles.controls}>
          <ControlsButton
            additionalStyles={notesListStyles.addButton}
            text="New note"
            onPressHandler={() => {
              navigation.navigate('Note', {id: null});
            }}
            iconName="add"
            iconSize={30}
            iconColor="blue"
          />
        </View>
      ) : (
        <View style={notesListStyles.controls}>
          <ControlsButton
            text={allNotesSelectedForDelete ? 'Unselect all' : 'Select all'}
            onPressHandler={() => {
              allNotesSelectedForDelete
                ? unselectAllNotesForDelete()
                : selectAllNotesForDelete();
            }}
            iconName={
              allNotesSelectedForDelete ? 'filter-none' : 'add-to-photos'
            }
            iconSize={20}
            iconColor="blue"
          />
          <ControlsButton
            text="Delete"
            onPressHandler={() => {
              notesSelectedForDelete.forEach((id) => {
                deleteNote(id);
              });
              setNotesSelectedForDelete([]);
              setIsDeletingNotesFromList(false);
              setAllNotesSelectedForDelete(false);
            }}
            iconName="delete"
            iconSize={20}
            iconColor="firebrick"
            disabled={notesSelectedForDelete.length === 0}
          />
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

const notesListStyles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 25,
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
    backgroundColor: 'rgba(241, 232, 232, 0.8).8)',
  },
});
