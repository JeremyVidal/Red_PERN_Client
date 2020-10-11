import React from 'react';

interface SavingsProps {
	userid: number,
	token: string,
}

class Savings extends React.Component<SavingsProps> {
	constructor(props: SavingsProps){
		super(props);
		this.state = {

		}
	}
	render(){
		return(
			<div>
				<h1>This is the Savings Portal!!!</h1>
			</div>
		)
	}
}

export default Savings;