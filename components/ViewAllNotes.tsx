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
  return (
    <>
      <View style={styles.wrap}>
        {console.log(notes)}
        <Text style={styles.greeting}>Hadi</Text>
        <TouchableOpacity>
          <Button
            title="Go to the note"
            onPress={() => navigation.navigate('Note')}
            color="red"
          />
          {notes &&
            notes.map((note: Note) => {
              return (
                <Text key={note.id} style={styles.greeting}>
                  {note.body}
                </Text>
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
