import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ViewAllNotes from './components/ViewAllNotes';
import Note from './components/Note';
import {createStackNavigator} from '@react-navigation/stack';
import {NotesProvider} from './contexts/NotesContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [headerTitle, setHeaderTitle] = useState<string>('Notes');
  const [isDeletingNotesFromList, setIsDeletingNotesFromList] = useState(false);
  const [notesSelectedForDelete, setNotesSelectedForDelete] = useState<
    string[]
  >([] as string[]);
  const [
    allNotesSelectedForDelete,
    setAllNotesSelectedForDelete,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (isDeletingNotesFromList) {
      setHeaderTitle('Delete notes');
    } else {
      setHeaderTitle('Notes');
    }
  }, [isDeletingNotesFromList]);

  return (
    <NavigationContainer>
      <NotesProvider>
        <Stack.Navigator initialRouteName="Home">
          {console.log('TU JESTEM', isDeletingNotesFromList)}
          <Stack.Screen
            options={{
              headerTitleStyle: {alignSelf: 'flex-start'},
              title: `${headerTitle}`,
              headerRight: () =>
                isDeletingNotesFromList && (
                  <Icon
                    onPress={() => {
                      setHeaderTitle('Notes');
                      setIsDeletingNotesFromList(false);
                      setAllNotesSelectedForDelete(false);
                      setNotesSelectedForDelete([]);
                    }}
                    name="close"
                    size={30}
                    style={{paddingRight: 20}}
                    color="#000000"
                  />
                ),
            }}
            name="Home">
            {(props) => (
              <ViewAllNotes
                {...props}
                setIsDeletingNotesFromList={setIsDeletingNotesFromList}
                isDeletingNotesFromList={isDeletingNotesFromList}
                notesSelectedForDelete={notesSelectedForDelete}
                setNotesSelectedForDelete={setNotesSelectedForDelete}
                allNotesSelectedForDelete={allNotesSelectedForDelete}
                setAllNotesSelectedForDelete={setAllNotesSelectedForDelete}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Note" component={Note} />
        </Stack.Navigator>
      </NotesProvider>
    </NavigationContainer>
  );
};

export default App;
