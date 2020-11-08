import * as React from "react";
import { ActivityIndicator, Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    fetch('http://34.86.145.66:3000/users/' + this.props.route.params.username).then(resp => resp.json()).then(resp => {
      this.setState({
        loading: false,
        info: resp["info"][0]
      });
    }).catch(err => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    let view;
    if (this.state.loading) {
      view = <ActivityIndicator/>
    } else {
      if (this.state.info) {
        view = <View>
          <Text style={[styles.text]}>Username: {this.state.info.username}</Text>
          <Text style={[styles.text]}>Age: {this.state.info.age} years</Text>
          <Text style={[styles.text]}>Weight: {this.state.info.weight} lbs</Text>
        </View>
      } else {
        view = <Text style={[styles.text]}>Could not load profile information.</Text>
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.separator} />
        {view}
        <View style={styles.separator} />
        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.pop()}>
          <Text style={[styles.text]}>Back</Text>
        </TouchableOpacity>
      </View>
    );
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
    color: "#ffffff",
    backgroundColor: "black"
  }
});
