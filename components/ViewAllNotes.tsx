import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useNotes, Note} from '../contexts/NotesContext';

interface NavigationParams {}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}
const ViewAllNotes: React.FC<Props> = ({navigation}) => {
  const {notes} = useNotes();

  const getNotePreview = (body: string): string => {
    const preview = [];
    for (let i = 0; i < 50; i++) {
      preview.push(body[i]);
    }

    return preview.join('');
  };

  return (
    <>
      <View style={styles.wrap}>
        {console.log(notes)}
        <Text style={styles.greeting}>Hadi</Text>
        <TouchableOpacity>
          <Button
            title="Add a new note"
            onPress={() => navigation.navigate('Note', {id: null})}
            color="blue"
          />
          {notes &&
            notes.map((note: Note) => {
              return (
                <Button
                  key={note.id}
                  title={getNotePreview(note.body)}
                  style={styles.greeting}
                  onPress={() => navigation.navigate('Note', {id: note.id})}
                  color="red"
                />
              );
            })}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ViewAllNotes;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});
