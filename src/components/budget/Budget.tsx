import React from 'react';

interface BudgetProps {
	userid: number,
	token: string,
}

class Budget extends React.Component<BudgetProps> {
	constructor(props: BudgetProps){
		super(props);
		this.state = {

		}
	}
	render(){
		return(
			<div>
				<h1>This is the Budget Portal!!!</h1>
			</div>
		)
	}
}

export default Budget;