import React from 'react';

interface CheckingProps {
	userid: number,
	token: string,
}

class Checking extends React.Component<CheckingProps> {
	constructor(props: CheckingProps){
		super(props);
		this.state = {

		}
	}
	render(){
		return(
			<div>
				<h1>This is the Checking Portal!!!</h1>
			</div>
		)
	}
}

export default Checking;