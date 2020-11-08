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
// import io from 'socket.io-client';


export default class Running extends React.Component {
    // sock;
  constructor(props) {
    super(props);
    this.state = {
        timeElapsed: 0,
        distTraveled: 0.00001,
        mateDistTraveled: 0.00001,
    };
    this.updateCounter = this.updateCounter.bind(this);
    this.updateDistances = this.updateDistances.bind(this);
  }

  updateCounter() {
    let te = this.state.timeElapsed;
    this.setState({
        timeElapsed: te + 1
    });
  }

  updateDistances() {
    let dt = this.state.distTraveled + Math.random() * 3;
    let dt2 = this.state.mateDistTraveled + Math.random() * 2.9998;
    this.setState({
        distTraveled: parseFloat(dt.toFixed(2)),
        mateDistTraveled: parseFloat(dt2.toFixed(2))
    });
  }

  componentDidMount() {
    // this.sock = io.io('http://localhost:3000');
    // this.sock.on('distanceUpdate', (data) => {
    // })
    setInterval(this.updateCounter, 1000);
    setInterval(this.updateDistances, 2000);
    console.log(this.props.route.params);
  }

  finishRun() {
    this.setState({
      loading: true,
    }, () => {
      fetch('http://34.86.145.66:3000/runs/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name1: this.props.route.params.username,
          name2: this.props.route.params.mate,
          distance: this.state.distTraveled,
          date: new Date().toLocaleDateString()
        })
      }).then(resp => resp.json()).then(resp => {
        console.log(resp);
        this.props.navigation.pop(3);
      });
    });
  }

  render() {
    return (
        <View style={styles.container}>
            <Text style={[styles.text,styles.title]}>Running</Text>
            <Text style={[styles.text,styles.timeStyle]}>{this.state.timeElapsed}s</Text>
            <View style={styles.userInfo}>
                <Text style={[styles.text,styles.infoTitle]}>Your Info</Text>
                <Text style={[styles.text,styles.distTraveled]}>Distance Traveled: {this.state.distTraveled}</Text>
                <Text style={[styles.text,styles.pace]}>Pace: {(this.state.distTraveled/this.state.timeElapsed).toFixed(2)} m/s</Text>
            </View>
            <View style={styles.partnerInfo}>
                <Text style={[styles.text,styles.infoTitle]}>Your Mate's Info</Text>
                <Text style={[styles.text,styles.distTraveled]}>Distance Traveled: {this.state.mateDistTraveled}</Text>
                <Text style={[styles.text,styles.pace]}>Pace: {(this.state.mateDistTraveled/this.state.timeElapsed).toFixed(2)} m/s</Text>
            </View>
            <View style={styles.partnerInfo}>
                <Text style={[styles.text,styles.infoTitle]}>Difference</Text>
                <Text style={[styles.text,styles.distTraveled]}>You are currently {(this.state.distTraveled - this.state.mateDistTraveled).toFixed(2)} meters ahead.</Text>
                <Text style={[styles.text,styles.pace]}>You are {((this.state.distTraveled - this.state.mateDistTraveled)/this.state.timeElapsed).toFixed(2)} m/s faster.</Text>
            </View>
            <TouchableOpacity onPress={() => {this.finishRun()}} style={styles.finishButton}>
              <Text>Finish Run</Text>
            </TouchableOpacity>;
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 100,
    fontFamily: "Optima",
    fontWeight: "bold",
    color: "#64D7FF"
  },
  titleStyle: {
    fontSize: 24
  },
  timeStyle: {
      fontSize: 28,
      color: 'green'
  },
  finishButton: {
      padding: 5,
      borderRadius: 5,
      borderWidth: 2,
      backgroundColor: 'lightblue',
      marginTop: 25
  },
  userInfo: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#eeeeee',
      paddingTop: 10,
      paddingBottom: 10
  },
  partnerInfo: {
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoTitle: {
      fontSize: 24,
      textAlign: 'center'
  },
  distTraveled: {
      fontSize: 20
  },
  pace: {
      fontSize: 24,
      color: 'red'
  },
  text: {
    color: 'white',
    backgroundColor: "black"
  }
});
