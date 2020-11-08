import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import MainScreen from "./MainScreen";

export default function TabTwoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TouchableOpacity onPress={() => navigation.navigate("TabOneScreen")}>
        <Text>Back</Text>
      </TouchableOpacity>
      <View
        style={styles.returner}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  returner: {
    flex: 1,
    justifyContent: "center"
  }
});
