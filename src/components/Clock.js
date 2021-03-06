import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';

class Clock extends React.Component {
  constructor(props){
    super(props)

    this.getTime = this.getTime.bind(this);
    this.setTime = this.setTime.bind(this);
    this.date = this.props.date;

    this.state = {
      days: null,
      hours: null, 
      minutes: null,
      seconds: null,
      date: null,
    }
      
    // setInterval(()=>{
    //   this.setTime();
    // },1000);
  }


  componentDidMount(){
    setInterval(()=>{
      this.getTime();
      this.setTime(); 
    },1000);
  }


  getTime(){
    AsyncStorage.getItem(this.props.event).then((value) => {
      this.setState({date: JSON.parse(value)});
      console.log("time", value);
    }).done();
  }

  setTime(){
    var time = new Date();
    var timeNowmm = Date.parse(time);

    var event = new Date(this.state.date);
    var eventmm = Date.parse(event);



    var timeLeftSeconds = (eventmm-timeNowmm)/1000;
    var timeLeftMinutes = timeLeftSeconds/60;
    var timeLeftHours = timeLeftMinutes/60;
    var timeLeftDays = timeLeftHours/24;

    var days = Math.floor(timeLeftDays);
    var hours = Math.floor((timeLeftDays-days)*24);
    var minutes = Math.floor((((timeLeftDays-days)*24)-hours)*60);
    var seconds = Math.floor((((((timeLeftDays-days)*24)-hours)*60)-minutes)*60);
    this.setState({days: days, hours: hours, minutes: minutes, seconds: seconds});
  }




  render() {

    if(this.state.days<0){
      var daysDisplay = "-"
      var hoursDisplay = "-"
      var minutesDisplay = "-"
      var secondsDisplay = "-"
    } else {
      daysDisplay = this.state.days
      hoursDisplay = this.state.hours
      minutesDisplay = this.state.minutes
      secondsDisplay = this.state.seconds
    }

    return (
      <View style={styles.clock}>

        <View style={styles.square}>
        <Text style={styles.timer}>{daysDisplay}</Text>
        <Text style={styles.text}>Days</Text>
        </View>

        <View style={styles.square}>
        <Text style={styles.timer}>{hoursDisplay}</Text>
        <Text style={styles.text}>Hours</Text>
        </View>

        <View style={styles.square}>
        <Text style={styles.timer}>{minutesDisplay}</Text>
        <Text style={styles.text}>Minutes</Text>
        </View>

        <View style={styles.square}>
        <Text style={styles.timer}>{secondsDisplay}</Text>
        <Text style={styles.text}>Seconds</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: 800,
    height: null,
    resizeMode: "cover",
  },
  square: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    margin: 2,
  },
  clock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 20,
  },
  timer: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
  },
  text:{
    color: 'white'
  }
});

export default Clock