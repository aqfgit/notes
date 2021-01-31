import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {useNotes, Note} from '../contexts/NotesContext';

interface NavigationParams {}

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const {addNote} = useNotes();
  return (
    <>
      <View style={styles.wrap}>
        <Text style={styles.greeting}>Note</Text>
        <Button
          title="Add"
          onPress={() => addNote(text, new Date().toLocaleDateString())}
        />
        <TextInput
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
