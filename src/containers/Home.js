import React from "react";
import {
  AppRegistry,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  ListView,
  ScrollView,
  AsyncStorage,

} from "react-native";

import {
  Actions,
} from "react-native-router-flux"

import Event from "../components/Event.js"


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Home extends React.Component {
  constructor(props){
    super(props)

    this.goNewEvent = this.goNewEvent.bind(this);

    this.state = {
      event: null,
      dataSource: ds.cloneWithRows([]),
      allKeys: [],
      allValues: [],
    }
      

  }

  componentDidMount(){
    this.getData();
  }

  getData(){
      var result = 
      AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
         var dataArray = stores.map((result, i, store) => {
         // get at each store's key/value so you can work with it
         let key = store[i][0];
         this.state.allKeys.push(key);
         console.log("event keys", key);

         let value = store[i][1];
         
         this.state.allValues.push(value);
         console.log("date values", value);
        });

        this.setState({dataSource: ds.cloneWithRows(this.state.allKeys)});
        console.log("ALL KEYS", this.state.allKeys);
      });
    });
  }


  goNewEvent(){
    Actions.newEvent();
  }

  render() {

    //sorting the events by name
    // this.state.allKeys.sort(function(a,b){
    // return (a - b)
    // });

    var eventNodes = this.state.allKeys.map((event, index)=>{
    return(
      <View style={styles.listItem} key={index}>
        <Event 
        event={event}
        >
          {event}
        </Event>
      </View>
    )
  })


    console.log("RESULT", this.state.allKeys);
    console.log("RESULT", this.state.allValues);
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.goNewEvent}
          >
            <Text style={styles.buttonText}>
              +
            </Text>
          </TouchableOpacity>
        </View>


        <ScrollView>
          {eventNodes}
        </ScrollView>


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
    backgroundColor: "#3684B8",
  },
  top: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width:350,
  },
  listItem: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 2,
    padding: 2,
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 5,
    alignSelf: "stretch",
    width: 350,
    height: 40,
  },
  listText:{
    color: "white",
    marginLeft: 10,
  },
  listView: {
    flex:0.9,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    alignSelf: "stretch",
  },
  button: {
    margin: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3684B8"
  },
  buttonText: {
    fontSize: 20,
    color: "white"
  },
});

export default Home;

              // <TouchableOpacity
              //   style={styles.button}
              // >
              //   <Text style={styles.buttonText}>
              //     >
              //   </Text>
              // </TouchableOpacity>

                      // <ListView
        //   styles={styles.listView}
        //   dataSource={this.state.dataSource}
        //   renderRow={(rowData) => 
        //     <TouchableHighlight style={styles.listItem} onPress={this.goEventView}
        //     >
        //       <Text style={styles.listText}>
        //         {rowData}
        //       </Text>
        //     </TouchableHighlight>
        //   }
        // />