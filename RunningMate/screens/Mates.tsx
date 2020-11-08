import * as React from "react";
import { ActivityIndicator, Alert, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default class Mates extends React.Component {
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
        friends: friends
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
      if (this.state.friends.length == 0) {
        view = <Text style={[styles.text]}>You currently have no friends.</Text>
      } else {
        view = this.state.friends.map(name => <Text key={name} style={[styles.text]}>{name}</Text>)
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mates</Text>
        <View style={styles.separator} />
        <View>
          {view}
        </View>
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
  backButton: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'lightblue',
    width: '30%',
    textAlign: 'center',
  },
  text: {
    color: "#ffffff",
    backgroundColor: "black"
  }
});
