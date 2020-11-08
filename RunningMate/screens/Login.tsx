import * as React from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.separator2} />
      <Text style={[styles.text]}>Username</Text>
      <TextInput style={styles.input} />
      <View style={styles.separator1} />
      <Text style={[styles.text]}>Password</Text>
      <TextInput style={styles.input} />
      <View style={styles.separator1} />
      <TouchableOpacity>
        <Text style={[styles.text]}>Create New Account</Text>
      </TouchableOpacity>
      <View style={styles.separator1} />
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
    backgroundColor: "#ffc0cb"
  },
  title: {
    fontSize: 100,
    fontFamily: "Optima",
    fontWeight: "bold",
    color: "#64D7FF"
  },
  separator1: {
    marginVertical: 20
  },
  separator2: {
    marginVertical: 50
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    color: "#ffffff",
    padding: 8,
    margin: 10,
    width: 100
  },
  text: {
    color: "#ffffff"
  }
});
