import * as React from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function History({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
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
    marginVertical: 100
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 100
  },
  text: {
    color: "#ffffff"
  }
});
