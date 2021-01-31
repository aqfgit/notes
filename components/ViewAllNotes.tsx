import React from 'react';
import {
  Button,
  StyleSheet,
  Alert,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const ViewAllNotes: React.FC = ({navigation}) => {
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
