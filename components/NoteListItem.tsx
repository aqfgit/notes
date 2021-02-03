import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Navigation = NavigationScreenProp<NavigationState>;

interface Props {
  navigation: Navigation;
  noteId: string;
  noteBody: string;
  noteCreatedAt: string;
  setIsDeletingNotesFromList: (newState: boolean) => void;
  isDeletingNotesFromList: boolean;
  allNotesSelectedForDelete: boolean;
  notesSelectedForDelete: string[];
  setNotesSelectedForDelete: (newState: string[]) => void;
}
const NoteListItem: React.FC<Props> = ({
  navigation,
  noteId,
  noteBody,
  noteCreatedAt,
  setIsDeletingNotesFromList,
  isDeletingNotesFromList,
  allNotesSelectedForDelete,
  notesSelectedForDelete,
  setNotesSelectedForDelete,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!isDeletingNotesFromList) {
      setSelected(false);
    }
  }, [isDeletingNotesFromList]);

  useEffect(() => {
    setSelected(allNotesSelectedForDelete);
  }, [allNotesSelectedForDelete]);

  const getNotePreview = (body: string): string => {
    const preview = [];
    const characterLimit = 40;
    for (let i = 0; i < characterLimit; i++) {
      preview.push(body[i]);
    }

    return body.length > characterLimit
      ? preview.join('').concat('...')
      : preview.join('');
  };

  return (
    <TouchableOpacity
      style={styles.wrap}
      onLongPress={() => {
        setIsDeletingNotesFromList(true);
        setSelected(true);
        setNotesSelectedForDelete([...notesSelectedForDelete, noteId]);
      }}
      onPress={() => {
        if (isDeletingNotesFromList) {
          if (selected) {
            const filteredSelected = notesSelectedForDelete.filter(
              (id) => id !== noteId,
            );
            setNotesSelectedForDelete(filteredSelected);
          } else {
            setNotesSelectedForDelete([...notesSelectedForDelete, noteId]);
          }
          setSelected((prevState) => !prevState);
        } else {
          navigation.navigate('Note', {id: noteId});
        }
      }}
      delayLongPress={300}>
      <View style={styles.noteWrap}>
        <Text style={styles.text}>{getNotePreview(noteBody)}</Text>
        <Text style={styles.date}>{noteCreatedAt}</Text>
      </View>
      {console.log('co?', isDeletingNotesFromList)}
      {isDeletingNotesFromList && (
        <Icon
          name={selected ? 'check-box' : 'check-box-outline-blank'}
          size={20}
        />
      )}
    </TouchableOpacity>
  );
};

export default NoteListItem;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  date: {
    flexBasis: '100%',
    color: '#a1a1a1',
  },
  noteWrap: {
    flex: 0,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  wrap: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingRight: 20,
    borderColor: '#d3d3d3',
  },
});
