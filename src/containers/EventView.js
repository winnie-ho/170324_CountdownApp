import React, { Component } from "react";
import {
  AppRegistry,
  View,
  StyleSheet,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import Clock from "../components/Clock.js"

import {
  Actions,
} from "react-native-router-flux"

class EventView extends React.Component {
  constructor(props){
    super(props)
    console.log(this.props);

    this.getTime = this.getTime.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);

    this.state = {
      date: null,
    }
      

  }
  componentDidMount(){
    this.getTime();
  }

  getTime(){
    AsyncStorage.getItem(this.props.event).then((value) => {
        this.setState({date: JSON.parse(value)});
    }).done();
  }

  deleteEvent(){
    AsyncStorage.removeItem(this.props.event)
    Actions.home();
  }

  render() {
    let pic = {
      uri: 'https://elblogdelcallado.files.wordpress.com/2014/02/hong-kong.jpg'
    };

    return (
      <View style={styles.container}>
        <Image source={pic} style={styles.image}>
          <Clock
            date={this.state.date}
            event={this.props.event}
          />
          <Text style={styles.event}>
            {this.props.event}
            {"\n"}
            {this.state.date}
          </Text>
           <TouchableOpacity
            style={styles.button}
            onPress={this.deleteEvent}
          >
            <Text style={styles.buttonText}>
              DELETE
            </Text>
          </TouchableOpacity>
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
    fontSize: 20,
    textAlign: 'center',
    color: "white",
    backgroundColor: 'rgba(0,0,0,0.3)',
    margin: 5,
    marginTop: 70,
    borderRadius: 5,
    padding: 60,
    borderWidth: 3,
    borderColor: 'white',
    width: 300,
  },
  button: {
    marginTop: 100,
    width: 70,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  buttonText: {
    fontSize: 14,
    color: "white"
  },
});

export default EventView;

