import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import Constants from 'expo-constants';
const haversine = require('haversine')

export default class App extends Component {
  state = {
    location: null,
    currentLongitude:null,
    currentLatitude:null,
    distanciaLosAngeles: null,
    distanciaMiami: null,
    distanciaCancun: null
  };

distanciaCancun = () =>
  {

    this.findCoordinates();
    var latitudCancun=21.0833;
    var longitudCancun= -86.85;

const start = {
  latitude: this.state.currentLatitude,
  longitude: this.state.currentLongitude
}

const end = {
  latitude: latitudCancun,
  longitude: longitudCancun
}

    var distCancun =  haversine(start, end, {unit: 'km'});

      distCancun = distCancun.toFixed(2);
       this.setState({ distanciaCancun: distCancun });
  }
  distanciaLosAngeles = () =>
  {

    this.findCoordinates();
    var latitudLA=34.05223;
    var longitudLA=  -118.24368;

const start = {
  latitude: this.state.currentLatitude,
  longitude: this.state.currentLongitude
}

const end = {
  latitude: latitudLA,
  longitude: longitudLA
}

    var distLosAngeles =  haversine(start, end, {unit: 'km'});

      distLosAngeles = distLosAngeles.toFixed(2);
       this.setState({ distanciaLosAngeles: distLosAngeles});
  }
    distanciaMiami = () =>
  {

    this.findCoordinates();
    var latitudM=25.77427;
    var longitudM=  -80.19366;

const start = {
  latitude: this.state.currentLatitude,
  longitude: this.state.currentLongitude
}

const end = {
  latitude: latitudM,
  longitude: longitudM
}

    var distM =  haversine(start, end, {unit: 'km'});

     distM = distM.toFixed(2);
       this.setState({ distanciaMiami: distM});
  }
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        this.setState({ location });
        this.setState({ currentLongitude });
         this.setState({ currentLatitude });

      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      <View style={styles.container}>
       
            <Text> Latitud Actual :{this.state.currentLatitude}</Text>
             <Text> Longitud Actual :{this.state.currentLongitude}</Text>
        <TouchableOpacity onPress={this.distanciaCancun} style={{backgroundColor:'red'}}>
             <Text>Distancia CANCUN: {this.state.distanciaCancun} </Text>
        </TouchableOpacity>
       <TouchableOpacity onPress={this.distanciaLosAngeles} style={{backgroundColor:'blue'}}>
             <Text>Distancia Los Angeles: {this.state.distanciaLosAngeles} </Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={this.distanciaMiami} style={{backgroundColor:'yellow'}}>
             <Text>Distancia Miami: {this.state.distanciaMiami} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});