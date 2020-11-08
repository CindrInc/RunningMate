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
      location: {},
      endLocation: {}
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
      let path = 'http://34.86.145.66:3000/runs/new_path?lat=' + location.coords.latitude + '&lon=' + location.coords.longitude + '&distance=' + this.props.route.params.distance;
      let resp = await fetch(path);
      let json = await resp.json();
      this.setState({
        location: location,
        endLocation: json,
        loading: false
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  render() {
    let view;
    if (this.state.loading) {
      view = <View>
        <Text style={styles.text}>Calculating your path...</Text>
        <ActivityIndicator size="large" />
      </View>
    } else {
      view = (
        <View>
          <Text style={[styles.text,styles.atitle]}>Your Calculated Path</Text>
          <Text style={[styles.text,styles.atitle]}>Start Location</Text>
          <Text style={[styles.text]}>
            Longitude: {this.state.location.coords.longitude}
          </Text>
          <Text style={[styles.text]}>
            Latitude: {this.state.location.coords.latitude}
          </Text>
          <View style={styles.separator} />
          <Text style={[styles.text,styles.atitle]}>End Location</Text>
          <Text style={[styles.text]}>
            Longitude: {this.state.endLocation.end_lon}
          </Text>
          <Text style={[styles.text]}>
            Latitude: {this.state.endLocation.end_lat}
          </Text>
          <View style={styles.separator} />
          <Text style={[styles.text,styles.atitle]}>Total Distance: {this.state.endLocation.distance * 2}</Text>
          <Text style={styles.text}>(This is a round trip run. Once you reach</Text>
          <Text style={styles.text}>your location, turn around and go back home.)</Text>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Running", {
            username: this.props.route.params.username,
            mate: this.props.route.params.mate
          })}>
            <Text style={[styles.text]}>Start Running</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.pop()}>
            <Text style={[styles.text]}>Back</Text>
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
    marginVertical: 10,
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
    color: "#ffffff",
    backgroundColor: "black",
    fontSize: 18
  },
  atitle: {
    fontSize: 22
  },
  button: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'lightblue',
    textAlign: 'center'
  },
});
