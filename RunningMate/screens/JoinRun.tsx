import * as React from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {Picker} from '@react-native-picker/picker';
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function JoinRun({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a mate</Text>
      <Text>Choose a mate.</Text>
      <Picker style={{height: 25, width: 100}}>
        
        <Picker.Item label="KingNeptune" value="KingNeptune" />
        <Picker.Item label="kylzhng" value="kylzhng" />
      </Picker>

      <TouchableOpacity onPress={() => navigation.navigate('Locations') }>
        <Text>Enter</Text>
      </TouchableOpacity>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TouchableOpacity onPress={() => navigation.pop()}>
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
    fontFamily: "Optima",
    fontWeight: "bold",
    color: "#64D7FF"
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
