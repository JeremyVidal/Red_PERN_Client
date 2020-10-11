import React from 'react';
import './NavBar.css';
import { Router,Link, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Dashboard from '../dashboard/Dashboard';
import Checking from '../checking/Checking';
import Savings from '../savings/Savings';
import Budget from '../budget/Budget';
import Settings from '../mysettings/Settings';
import Admin from '../admin/Admin';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



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
		this.useStyles = this.useStyles.bind(this);

	}
	useStyles = makeStyles((theme) => ({
		root: {
		  flexGrow: 1,
		},
		menuButton: {
		  marginRight: theme.spacing(2),
		},
		title: {
		  flexGrow: 1,
		},
	}));
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
				{
				this.state.admin === true ? 
					<Switch>
						<Route exact path="/admin"><Admin token={this.props.token} clearToken={this.props.clearToken}/></Route>
					</Switch>
				:
				<Router history={history}>
					    <AppBar position="fixed" className="myNavBar">
							<Toolbar>
								<Typography variant="h6">
									Welcome: {this.state.firstName + ' ' + this.state.lastName}
								</Typography>
								<Button color="inherit"><Link to="/dashboard">Dashboard</Link></Button>
								<Button color="inherit"><Link to='/checking'>Checking</Link></Button>
								<Button color="inherit"><Link to='/savings'>Savings</Link></Button>
								<Button color="inherit"><Link to='/budget'>Budget</Link></Button>
								<Button color="inherit"><Link to='/settings'>Settings</Link></Button>
								<Button color="inherit" onClick={this.props.clearToken}><Link to=''>Logout</Link></Button>
							</Toolbar>
						</AppBar>
				<Switch>
					<Route exact path="/dashboard"><Dashboard token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/"><Dashboard token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/checking"><Checking token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/savings"><Savings token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/budget"><Budget token={this.props.token} userid={this.props.userid}/></Route>
					<Route exact path="/settings"><Settings token={this.props.token} userid={this.props.userid}/></Route>
				</Switch>
				</Router>
				}
			</div>
		)
	}
}

export default NavBar;