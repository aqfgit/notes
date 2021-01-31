import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ViewAllNotes from './components/ViewAllNotes';
import Note from './components/Note';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={ViewAllNotes} />
        <Stack.Screen name="Note" component={Note} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
