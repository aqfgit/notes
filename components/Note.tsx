import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = ({navigation}) => {
  return (
    <>
      <View style={styles.wrap}>
        <Text style={styles.greeting}>Note</Text>
        <Button
          title="Go to the home page"
          onPress={() => navigation.navigate('Home')}
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
});
