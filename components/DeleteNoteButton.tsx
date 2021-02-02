import React from 'react';
import {StyleSheet, Button, Alert} from 'react-native';
import {useNotes} from '../contexts/NotesContext';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

type Navigation = NavigationScreenProp<NavigationState>;

type Props = {
  navigation: Navigation;
  noteId: string;
  setShowDelete?: (newState: boolean) => void;
};
const DeleteNoteButton: React.FC<Props> = ({
  navigation,
  noteId,
  setShowDelete,
}) => {
  const {deleteNote} = useNotes();
  return (
    <Button
      title="delete"
      onPress={() => {
        Alert.alert('Warning', 'Are you sure you wanna delete this note?', [
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
            onPress: () => {
              if (setShowDelete) {
                setShowDelete(false);
              }
            },
          },
        ]);
      }}
    />
  );
};

export default DeleteNoteButton;
