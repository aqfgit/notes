import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

interface NavigationParams {}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

const App: React.FC<Props> = ({navigation}) => {
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
