import * as React from "react";
import { Alert, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Image source={require('./logo.png')} />
        <View style={styles.separator2} />
        <Text style={[styles.text]}>Username</Text>
        <TextInput style={styles.input} onChangeText={(value) => { this.setState({username: value})}}/>
        <View style={styles.separator1} />
        <Text style={[styles.text]}>Password</Text>
        <TextInput style={styles.input} secureTextEntry={true}/>
        <View style={styles.separator1} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MainScreen', { username: this.state.username })}>
          <Text style={[styles.text]}>Sign In</Text>
        </TouchableOpacity>
        <Text>OR</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MainScreen', { username: this.state.username })}>
          <Text style={[styles.text]}>Create New Account</Text>
        </TouchableOpacity>
        <View style={styles.separator1} />
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
  separator1: {
    marginVertical: 20
  },
  separator2: {
    marginVertical: 50
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    color: "#ffffff",
    padding: 8,
    margin: 10,
    width: 100
  },
  text: {
    color: "#ffffff"
  }
});
