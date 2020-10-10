import React from 'react';
import { Router,Link, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Dashboard from '../dashboard/Dashboard';
import Checking from '../checking/Checking';
import Savings from '../savings/Savings';
import Budget from '../budget/Budget';
import Settings from '../settings/Settings';
import Admin from '../admin/Admin';

interface NavBarProps {
	userid: number,
	clearToken: any;
	token: string,
	admin: boolean,
}
interface NavBarState {
	firstName: string, 
	lastName: string, 
	admin: boolean,

}
const history = createBrowserHistory();
class NavBar extends React.Component<NavBarProps, NavBarState> {
	constructor(props: NavBarProps){
		super(props);
		this.state = {
			firstName: '', 
			lastName: '', 
			admin: false,
		}
	}
	componentDidMount = () => {
		fetch('http://localhost:4000/user/name', {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({firstName: data.firstName})
			this.setState({lastName: data.lastName})
		})
		this.setState({admin: this.props.admin})
	}


	render(){
		return(
			<div>
				<table>
					<tbody><tr><td>Welcome: {this.state.firstName + ' ' + this.state.lastName}</td></tr></tbody>
				</table>
				{
				this.state.admin === true ? 
					<Switch>
						<Route exact path="/admin"><Admin token={this.props.token} clearToken={this.props.clearToken}/></Route>
					</Switch>
				:
				<Router history={history}>
					<button><Link to="/dashboard">Dashboard</Link></button>
					<button><Link to='/checking'>Checking</Link></button>
					<button><Link to='/savings'>Savings</Link></button>
					<button><Link to='/budget'>Budget</Link></button>
					<button><Link to='/settings'>Settings</Link></button>
					<button onClick={this.props.clearToken}><Link to=''>Logout</Link></button>
				<Switch>
					<Route exact path="/dashboard"><Dashboard token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/"><Dashboard token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/checking"><Checking token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/savings"><Savings token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/budget"><Budget token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/settings"><Settings token={this.props.token} userid={this.props.userid}/></Route>
				</Switch>
				</Router>
				};
			</div>
		)
	}
}

export default NavBar;