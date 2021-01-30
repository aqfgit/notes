import React from 'react';
import {
  Button,
  StyleSheet,
  Alert,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const App: React.FC = () => {
  const onTest = () => {
    Alert.alert('hello!', 'OK');
  };

  return (
    <>
      <View style={styles.wrap}>
        <Text style={styles.greeting}>Hi</Text>
        <TouchableOpacity>
          <Button title="Yo" onPress={onTest} color="red" />
        </TouchableOpacity>
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
