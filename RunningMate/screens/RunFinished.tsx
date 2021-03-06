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
        mateDistTraveled: 0.00001
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
  }

  finishRun = async () => {

  }

  render() {
    
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>Your Run Stats</Text>
            <Text style={styles.title}>{this.state.timeElapsed}s</Text>
            <Text style={styles.subtitle}></Text>
            <View style={styles.userInfo}>
                <Text style={styles.infoTitle}>Your Info</Text>
                <Text style={styles.distTraveled}>Distance Traveled: {this.state.distTraveled}</Text>
                <Text style={styles.pace}>Pace: {(this.state.distTraveled/this.state.timeElapsed).toFixed(2)} m/s</Text>
            </View>
            <View style={styles.partnerInfo}>
                <Text style={styles.infoTitle}>Your Mate's Info</Text>
                <Text style={styles.distTraveled}>Distance Traveled: {this.state.mateDistTraveled}</Text>
                <Text style={styles.pace}>Pace: {(this.state.mateDistTraveled/this.state.timeElapsed).toFixed(2)} m/s</Text>
            </View>
            <View style={styles.partnerInfo}>
                <Text style={styles.infoTitle}>Difference</Text>
                <Text style={styles.distTraveled}>You are currently {(this.state.distTraveled - this.state.mateDistTraveled).toFixed(2)} meters ahead.</Text>
                <Text style={styles.pace}>You are {((this.state.distTraveled - this.state.mateDistTraveled)/this.state.timeElapsed).toFixed(2)} m/s faster.</Text>
            </View>
            <TouchableOpacity style={styles.finishButton}>
                Finish Run
            </TouchableOpacity>
        </View>
    )
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
  }
});
