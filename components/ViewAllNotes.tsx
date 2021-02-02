import React from 'react';
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
}
const ViewAllNotes: React.FC<Props> = ({navigation}) => {
  const {notes, setIsAddingANewNote} = useNotes();

  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.addNote}>
        <Button
          title="New Note"
          onPress={() => {
            setIsAddingANewNote(true);
            navigation.navigate('Note', {id: null});
          }}
          color="blue"
        />
      </TouchableOpacity>

      {notes && (
        <FlatList
          data={notes}
          renderItem={({item}) => (
            <NoteListItem
              key={item.id}
              navigation={navigation}
              noteId={item.id}
              noteBody={item.body}
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
    borderWidth: 5,
    borderColor: 'green',
    flex: 1,
    flexDirection: 'column',
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
  addNote: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    zIndex: 2,
  },
});
