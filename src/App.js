import React from "react";
import Home from "./containers/Home";
import EventView from "./containers/EventView";
import NewEvent from "./containers/NewEvent";

import {
	Router,
	Scene,
} from "react-native-router-flux";

import{
	Platform
} from "react-native"

class App extends React.Component {
	render(){
		return(
			<Router>
				<Scene key = "root" style={{paddingTop: Platform.OS=== "ios" ? 64 : 54}}>
					<Scene key = "home" component = {Home} title = "Events"/>
					<Scene key = "eventView" component = {EventView} title = "EventView"/>
					<Scene key = "newEvent" component = {NewEvent} title = "NewEvent"/>
				</Scene>
			</Router>
		);
	}
}

export default App;