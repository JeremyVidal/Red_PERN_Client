import React from 'react';
import NavBar from '../site/NavBar';

interface DashProps {
	userid: number,
	token: string,
}
interface DashState {
	user_id: any,
	checking: any[], 
	savings: any[], 

}

class Dashboard extends React.Component<DashProps, DashState> {
	constructor(props: DashProps){
		super(props);
		this.state = {
			user_id: 0, // ??????? how to set this to be defaulted to the incoming prop
			checking: [],
			savings: [],
		}
		// this.getChecking = this.getChecking.bind(this);

	}
	componentDidMount = () => {
		fetch('http://localhost:4000/checking', {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			this.setState({user_id: this.props.userid})
			this.setState({checking: [ ...this.state.checking, ...data ]})			  
		})

		fetch('http://localhost:4000/savings', {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			this.setState({savings: [ ...this.state.savings, ...data ]})			  
		})
	}

	render(){
		return(
			<div>
				<h1>This is the Dashboard!!!</h1>
				<h2>User Id: {this.props.userid}</h2>
					<table>
						<thead>
							<tr><th>Name</th><th>Amount</th></tr>
						</thead>
						<tbody>
							{this.state.checking.map((data, i) => (
							<tr key={i}>
								<td>{data.checkingName}</td>
								<td>${data.checkingAmount}</td>
							</tr>
							))}	
						</tbody>
					</table>
					<hr />
					<table>
						<thead>
							<tr><th>Name</th><th>Amount</th></tr>
						</thead>
						<tbody>
							{this.state.savings.map((data, i) => (
							<tr key={i}>
								<td>{data.savingsName}</td>
								<td>${data.savingsAmount}</td>
							</tr>
							))}	
						</tbody>
					</table>
			</div>
		)
	}
}

export default Dashboard;