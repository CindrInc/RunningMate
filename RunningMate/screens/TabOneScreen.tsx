import * as React from "react";
import { ActivityIndicator, Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import RadioGroup from "../react-native-radio-button-group";
import { Picker } from "@react-native-picker/picker";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { State } from "react-native-gesture-handler";

var radiogroup1_options = [
  { id: 0, label: "North" },
  { id: 1, label: "South" }
];

var radiogroup2_options = [
  { id: 0, label: "East", color: "#ffffff" },
  { id: 1, label: "West" }
];
export default class TabOneScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      distance: 2,
      friends: [],
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
      view = <Picker style={{ height: 25, width: 100 }} onValueChange={value => {this.setState({mate: value}); console.log(value)}}>
        {this.state.friends.map(name => <Picker.Item label={name} value={name} key={name}/>)}
      </Picker>
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Running Mate</Text>
        <View style={styles.separator} />
        <Text style={[styles.text]}>Enter Distance (Miles):</Text>
        <TextInput style={styles.input} onChangeText={(value) => {this.setState({distance: parseInt(value)})}}/>
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
        {view}
        <View style={styles.separator} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Locations", {
          distance: this.state.distance,
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
    fontWeight: "bold",
    fontFamily: "Optima",
    color: "#64D7FF"
  },
  separator: {
    marginVertical: 15,
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
