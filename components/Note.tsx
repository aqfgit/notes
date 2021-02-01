import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {useNotes, Note} from '../contexts/NotesContext';

type Props = {
  route: {
    params: {
      id: string;
    };
  };
};

const App: React.FC<Props> = ({route}) => {
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
