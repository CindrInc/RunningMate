import * as React from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function Mates({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mates</Text>
      <TouchableOpacity onPress={() => navigation.navigate("TabOneScreen")}>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
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
  },
  backButton: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'lightblue',
    width: '30%',
    textAlign: 'center'
  }
});
