import * as React from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import RadioGroup from "../react-native-radio-button-group";
import { Picker } from "@react-native-picker/picker";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { State } from "react-native-gesture-handler";

var radiogroup1_options = [
  { id: 0, label: <Text style={{ color: "#FFFFFF" }}>{"North"}</Text> },
  { id: 1, label: <Text style={{ color: "#FFFFFF" }}>{"South"}</Text> }
];

var radiogroup2_options = [
  { id: 0, label: <Text style={{ color: "#FFFFFF" }}>{"East"}</Text> },
  { id: 1, label: <Text style={{ color: "#FFFFFF" }}>{"West"}</Text> }
];
export default function TabOneScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Running Mate</Text>
      <View style={styles.separator} />
      <Text style={[styles.text]}>Enter Distance (Miles):</Text>
      <TextInput style={styles.input} />
      <View style={styles.separator} />
      <Text style={[styles.text]}>
        Generally, would you like to go North or South?
      </Text>
      <RadioGroup
        horizontal
        options={radiogroup1_options}
        circleStyle={{ fillColor: "pink", borderColor: "pink" }}
        activeButtonId={0}
      />
      <View style={styles.separator} />
      <Text style={[styles.text]}>
        Generally, would you like to go East or West?
      </Text>
      <RadioGroup
        horizontal
        options={radiogroup2_options}
        circleStyle={{ fillColor: "pink", borderColor: "pink" }}
        activeButtonId={0}
      />
      <View style={styles.separator} />
      <Text style={[styles.text]}>Choose a mate.</Text>
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
    fontWeight: "bold",
    fontFamily: "Optima",
    color: "#64D7FF"
  },
  separator: {
    marginVertical: 30,
    fontWeight: "bold"
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 50,
    height: 25,
    color: "#ffffff"
  },
  text: {
    color: "#ffffff"
  }
});
