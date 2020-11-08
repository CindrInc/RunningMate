import * as React from "react";
import { ActivityIndicator, Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      history: []
    };
  }

  componentDidMount() {
    fetch('http://34.86.145.66:3000/runs/' + this.props.route.params.username).then(resp => resp.json()).then(resp => {
      this.setState({
        loading: false,
        history: resp["runs"]
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
      if (this.state.history.length == 0) {
        view = <Text style={[styles.text]}>You currently have no history on this app.</Text>
      } else {
        view = this.state.history.map(obj => <View>
          <Text key={obj.date} style={[styles.text]}>You ran {obj.distance} miles with {obj.name2} on {new Date(obj.date).toLocaleDateString()}</Text>
          <View style={styles.separator} />
        </View>)
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>History</Text>
        <View style={styles.separator} />
        <View>
          {view}
        </View>
        
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
    marginVertical: 2
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
