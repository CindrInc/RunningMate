import * as React from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  PixelRatio
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

width: Dimensions.get("window").width;

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View adjustsFontSizeToFit style={styles.container}>
        <Text style={styles.title}>Running Mate</Text>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.mainButton} onPress={() => this.props.navigation.navigate("TabOneScreen", this.props.route.params)}>
          <Text style={[styles.text]}>Start Run</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.mainButton} onPress={() => this.props.navigation.navigate("JoinRun", this.props.route.params)}>
          <Text style={[styles.text]}>Join a Mate</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.mainButton} onPress={() => this.props.navigation.navigate("Mates", this.props.route.params)}>
          <Text style={[styles.text]}>Mates</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.mainButton} onPress={() => this.props.navigation.navigate("History", this.props.route.params)}>
          <Text style={[styles.text]}>History</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.mainButton} onPress={() => this.props.navigation.navigate("Profile", this.props.route.params)}>
          <Text style={[styles.text]}>Profile</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  }
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000"
  },
  title: {
    fontSize: actuatedNormalize(20),
    fontFamily: "Optima",
    fontWeight: "bold",
    color: "#64D7FF"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "25%"
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 100
  },
  mainButton: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'lightblue',
    textAlign: 'center'
  },
  text: {
    color: "black"
  }
});
