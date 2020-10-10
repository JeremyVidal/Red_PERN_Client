import React from 'react';

interface AdminProps {
	clearToken: any;
	token: string,
}

class Admin extends React.Component<AdminProps> {
	constructor(props: AdminProps){
		super(props);
		this.state = {

		}
	}
	render(){
		return(
			<div>
				<h1>This is the Admin Portal!!!</h1>
				<button onClick={this.props.clearToken}>Logout</button>

			</div>
		)
	}
}

export default Admin;