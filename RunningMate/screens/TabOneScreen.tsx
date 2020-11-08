import * as React from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import RadioGroup from 'react-native-radio-button-group';
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

var radiogroup1_options = [
  {id: 0, label: 'North' },
  {id: 1, label: 'South' },
];

var radiogroup2_options = [
  {id: 0, label: 'East' },
  {id: 1, label: 'West' },
];     
export default function TabOneScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RUNNING MATE</Text>
      <Text>Enter Distance (Miles):</Text>
      <TextInput style={styles.input} />
      <Text>Generally, would you like to go North or South?</Text>
      <RadioGroup
        horizontal
        options={radiogroup1_options}
        circleStyle={{ fillColor: 'pink', borderColor: 'pink' }}
      />
    

      <Text>Generally, would you like to go East or West?</Text>
      <RadioGroup
        horizontal
        options={radiogroup2_options}
        circleStyle={{ fillColor: 'pink', borderColor: 'pink' }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Locations') }>
        <Text>Enter</Text>
      </TouchableOpacity>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      
      <TouchableOpacity onPress={() => navigation.navigate("MainScreen")}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 100,
    fontWeight: 'bold',
    fontFamily: 'Optima',
    color: '#64D7FF'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 100
  }
});
