import React, { Component } from "react";
import {
  AppRegistry,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import Clock from "../components/Clock.js"

class EventView extends React.Component {
  constructor(props){
    super(props)

    this.state = {
    }
      

  }


  render() {
    let pic = {
      uri: 'https://elblogdelcallado.files.wordpress.com/2014/02/hong-kong.jpg'
    };

    return (

      <View style={styles.container}>
        <Image source={pic} style={styles.image}>
          <Clock/>
          <Text style={styles.event}>
              HONG{"\n"}
              KONG
          </Text>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: 800,
    height: null,
    resizeMode: "cover",
  },
  event: {
    fontSize: 50,
    textAlign: 'center',
    color: "white",
    backgroundColor: 'rgba(0,0,0,0.3)',
    margin: 12,
    marginTop: 70,
    borderRadius: 5,
    padding: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
});

export default EventView;

