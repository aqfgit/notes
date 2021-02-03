import React, {useState, useEffect} from 'react';
import DeleteNoteButton from './DeleteNoteButton';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useNotes} from '../contexts/NotesContext';
import {notesListStyles} from './ViewAllNotes';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const {addNote, getNote, editNote, deleteNote} = useNotes();

  useEffect(() => {
    if (id) {
      setText(getNote(id).body);
      setEditable(false);
      setIsNew(false);
    }
  }, []);

  return (
    <>
      <View style={styles.screenWrap}>
        <View style={styles.controls}>
          {!isNew ? (
            <TouchableOpacity
              style={[notesListStyles.button]}
              onPress={() => {
                if (editable) {
                  console.log('ID', noteId);
                  editNote(noteId, text);
                }
                setEditable((prevState) => !prevState);
              }}>
              <Icon
                name={editable ? 'save' : 'mode-edit'}
                size={30}
                style={notesListStyles.icon}
                color="blue"
              />
              <Text style={notesListStyles.buttonText}>
                {editable ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[notesListStyles.button]}
              onPress={async () => {
                const newNoteID = await addNote(
                  text,
                  new Date().toLocaleDateString(),
                );
                if (newNoteID === null) {
                  throw new Error('There was a problem with creating a note');
                }
                setNoteId(newNoteID);
                setIsNew(false);
                setEditable(false);
              }}>
              <Icon
                name="save"
                size={30}
                style={notesListStyles.icon}
                color="blue"
              />
              <Text style={notesListStyles.buttonText}>Save</Text>
            </TouchableOpacity>
          )}
          {!isNew && (
            <TouchableOpacity
              style={[notesListStyles.button]}
              onPress={() => {
                Alert.alert(
                  'Warning',
                  'Are you sure you wanna delete this note?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        deleteNote(noteId);
                        navigation.navigate('Home');
                      },
                    },
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                  ],
                );
              }}>
              <Icon
                name="delete"
                size={30}
                style={notesListStyles.icon}
                color="firebrick"
              />
              <Text style={notesListStyles.buttonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputWrap}>
          <TextInput
            editable={editable}
            style={styles.text}
            multiline={true}
            numberOfLines={1}
            onChangeText={(inputText) => setText(inputText)}
            value={text}
            autoFocus={true}
          />
        </View>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  screenWrap: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputWrap: {
    flex: 0,
  },
  controls: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#d1d1d1',
    paddingHorizontal: 20,
  },
  text: {
    lineHeight: 20,
  },
});
