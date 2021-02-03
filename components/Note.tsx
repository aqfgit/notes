import React, {useState, useEffect} from 'react';
import DeleteNoteButton from './DeleteNoteButton';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useNotes} from '../contexts/NotesContext';

type Navigation = NavigationScreenProp<NavigationState>;

type Props = {
  route: {
    params: {
      id: string;
    };
  };
  navigation: Navigation;
};

const App: React.FC<Props> = ({route, navigation}) => {
  const [text, setText] = useState<string>('');
  const [editable, setEditable] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const {id} = route.params;
  const [noteId, setNoteId] = useState(id);
  const {addNote, getNote, editNote} = useNotes();

  useEffect(() => {
    if (id) {
      setText(getNote(id).body);
      setEditable(false);
      setIsNew(false);
    }
  }, []);

  return (
    <>
      <View style={styles.wrap}>
        <Text style={styles.greeting}>Note</Text>
        {!isNew ? (
          <Button
            title={editable ? 'Save' : 'Edit'}
            onPress={() => {
              if (editable) {
                console.log('ID', noteId);
                editNote(noteId, text);
              }
              setEditable((prevState) => !prevState);
            }}
          />
        ) : (
          <Button
            title="Save"
            onPress={async () => {
              const newNoteID = await addNote(
                text,
                new Date().toLocaleDateString(),
              );
              setNoteId(newNoteID);
              setIsNew(false);
              setEditable(false);
            }}
          />
        )}

        <TextInput
          editable={editable}
          style={styles.text}
          multiline={true}
          numberOfLines={10}
          onChangeText={(inputText) => setText(inputText)}
          value={text}
        />
      </View>
      {!isNew && <DeleteNoteButton navigation={navigation} noteId={noteId} />}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
  text: {
    borderColor: 'red',
    borderWidth: 10,
  },
});
