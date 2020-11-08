import * as React from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function JoinRun({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a Mate</Text>
      <View style={styles.separator} />
      <Text style={[styles.text]}>Choose a Mate.</Text>
      <Picker style={{ height: 25, width: 100 }}>
        <Picker.Item label="KingNeptune" value="KingNeptune" />
        <Picker.Item label="kylzhng" value="kylzhng" />
      </Picker>
      <View style={styles.separator} />
      <TouchableOpacity onPress={() => navigation.navigate("Locations")}>
        <Text style={[styles.text]}>Enter</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text style={[styles.text]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000"
  },
  title: {
    fontSize: 100,
    fontFamily: "Optima",
    fontWeight: "bold",
    color: "#64D7FF"
  },
  separator: {
    marginVertical: 30
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 100,
    color: "#ffffff"
  },
  text: {
    color: "#ffffff"
  }
});
