import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      location: {}
    };
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        location: location,
        loading: false
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  render() {
    let view;
    if (this.state.loading) {
      view = <ActivityIndicator size="large" />;
    } else {
      view = (
        <View>
          <Text>Longitude: {this.state.location.coords.longitude}</Text>
          <Text>Latitude: {this.state.location.coords.latitude}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.pop()}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <View style={styles.container}>{view}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  closestStopText: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10
  }
});
