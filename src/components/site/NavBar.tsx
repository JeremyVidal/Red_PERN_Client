import React from 'react';
import { Router,Link, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Dashboard from '../dashboard/Dashboard';
import Checking from '../checking/Checking';
import Savings from '../savings/Savings';
import Budget from '../budget/Budget';
import Settings from '../settings/Settings';


interface NavBarProps {
	userid: number,
	clearToken: any;
	token: string,
}
const history = createBrowserHistory();
class NavBar extends React.Component<NavBarProps> {
	constructor(props: NavBarProps){
		super(props);
		this.state = {

		}
	}
	render(){
		return(
			<div>
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
			</div>
		)
	}
}

export default NavBar;