import React, { Component } from 'react';

interface DashProps {
	clearToken: any;
}

class Dashboard extends React.Component<DashProps> {
	constructor(props: DashProps){
		super(props);
		this.state = {

		}
	}
	render(){
		return(
			<div>
				<h1>This is the Dashboard!!!</h1>
				<button onClick={this.props.clearToken}>Logout</button>
			</div>
		)
	}
}

export default Dashboard;