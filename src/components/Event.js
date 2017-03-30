import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';

import {
  Actions,
} from "react-native-router-flux"

class Event extends React.Component {
  constructor(props){
    super(props)

    this.goEventView = this.goEventView.bind(this);


    this.state = {
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

  goEventView(){
    Actions.eventView({
      event: this.props.event
    });
  }

  render() {


    return (      
      <View>
        <Text 
        style={styles.text}
        onPress={this.goEventView}
        >
          {this.props.event}
        </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    color: "white",
  }
});

export default Event