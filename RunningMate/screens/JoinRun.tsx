import * as React from "react";
import { ActivityIndicator, Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default class JoinRun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      friends: []
    };
  }

  componentDidMount() {
    fetch('http://34.86.145.66:3000/users/' + this.props.route.params.username +'/friends').then(resp => resp.json()).then(resp => {
      let friends = [];
      for (let obj of resp['mates']) {
        friends.push(obj['name2']);
      }
      this.setState({
        loading: false,
        friends: friends,
        mate: friends[0]
      });
    }).catch(err => {
      this.setState({
        loading: false,
        friends: []
      });
    });
  }

  render() {
    let view;
    if (this.state.loading) {
      view = <ActivityIndicator/>
    } else {
      view = <Picker style={{ height: 25, width: 100 }} onValueChange={(value) => this.setState({ mate: value })}>
        {this.state.friends.map(name => <Picker.Item label={name} value={name} key={name}/>)}
      </Picker>
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Join a Mate</Text>
        <View style={styles.separator} />
        <Text style={[styles.text]}>Choose a Mate.</Text>
        {view}
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Locations", {
          distance: 5,
          username: this.props.route.params.username,
          mate: this.state.mate
        })}>
          <Text style={[styles.text]}>Enter</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
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
    color: "#ffffff",
    backgroundColor: "black"
  }
});
