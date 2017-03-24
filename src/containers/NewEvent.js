import React, { Component } from "react";
import {
  AppRegistry,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  DatePickerIOS,
} from "react-native";

import {
  Actions,
} from "react-native-router-flux"

class newEvent extends React.Component {
  constructor(props){
    super(props)

    this.addEvent = this.addEvent.bind(this);
    this.handleOnChangeEventName = this.handleOnChangeEventName.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.state = {
      eventName: null,
      eventTime: new Date(),
    }
  }

  onDateChange(date){
    this.setState({date: date});
  }

  addEvent(){
    AsyncStorage.setItem(this.state.eventName, JSON.stringify(this.state.eventTime));
    console.log("event", this.state.eventName);
    console.log("time", this.state.eventTime);
    Actions.home()

  }

  handleOnChangeEventName(event){
    var eventName = event;
    this.setState({eventName: eventName});
  }


  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.text}>Add New Event</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={this.handleOnChangeEventName}
          value={this.state.eventName}
        />

        <TouchableOpacity
          onPress={this.addEvent}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Add
          </Text>
        </TouchableOpacity>

        <DatePickerIOS
          style={styles.DP}
          date={this.state.eventTime}
          mode="datetime"
          onDateChange={this.onDateChange}
        />
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    marginTop: 30,
  },
  text: {
    color: "#3684B8",
  },
  DP: {
    color: "#3684B8",
    width: 300,
  },
  input: {
    padding: 5,
    height: 30,
    borderWidth: 0.5,
    borderColor: "#3684B8",
    borderRadius: 5,
    margin: 20,
    fontSize: 12,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 12,
    color: "white"
  },
  button: {
    width: 80,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3684B8"
  },

});

export default newEvent;

