import React from 'react';

interface AdminProps {
	userid: number,
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
			</div>
		)
	}
}

export default Admin;