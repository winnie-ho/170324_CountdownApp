import React from "react";
import {
  AppRegistry,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ListView,
  AsyncStorage,

} from "react-native";

import {
  Actions,
} from "react-native-router-flux"

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Home extends React.Component {
  constructor(props){
    super(props)

    this.goEventView = this.goEventView.bind(this);
    this.goNewEvent = this.goNewEvent.bind(this);

    this.state = {
      event: "",
      dataSource: ds.cloneWithRows([]),
      allKeys: [],
      allValues: []
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
      });
    });
  }

  goEventView(){
    Actions.eventView();
  }

  goNewEvent(){
    Actions.newEvent();
  }

  render() {
    console.log("RESULT", this.state.allKeys);
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
        <ListView
          styles={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View style={styles.listItem}>
              <Text style={styles.listText}>
                {rowData}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={this.goEventView}
              >
                <Text style={styles.buttonText}>
                  >
                </Text>
              </TouchableOpacity>

            </View>
          }
        />

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
    borderColor: "#3684B8",
    borderRadius: 5,
    alignSelf: "stretch",
    width: 350,
  },
  listText:{
    color: "#3684B8",
    marginLeft: 5,
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
    margin: 2,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#3684B8"
  },
  buttonText: {
    fontSize: 15,
    color: "white"
  },
});

export default Home;

