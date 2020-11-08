import * as React from 'react';
import { Alert, StyleSheet, TextInput} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Button } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RUNNINGMATE</Text>
      <Text>Enter Distance (Miles):</Text>
      <TextInput style={styles.input} />
      <Button>
        title="Enter"
        onPress={() => }
      </Button>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.js" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 100,
    fontWeight: 'bold',
    fontFamily: 'Comic Sans MS',
    color: 'red'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 100,
  }
});
