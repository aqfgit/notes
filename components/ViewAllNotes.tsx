import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

interface NavigationParams {}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}
const ViewAllNotes: React.FC<Props> = ({navigation}) => {
  return (
    <>
      <View style={styles.wrap}>
        <Text style={styles.greeting}>Hadi</Text>
        <TouchableOpacity>
          <Button
            title="Go to the note"
            onPress={() => navigation.navigate('Note')}
            color="red"
          />
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
