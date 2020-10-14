import React from 'react';
import './NavBar.css';
import { Router,Link, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Dashboard from '../dashboard/Dashboard';
import Checking from '../checking/Checking';
import Savings from '../savings/Savings';
import Settings from '../mysettings/Settings';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import APIURL from "../../helpers/environment";



interface NavBarProps {
	clearToken: any;
	token: string,
	admin: boolean,
}
interface NavBarState {
	firstName: string, 
	lastName: string, 
	beginChecking: number | null,
	beginSavings: number | null,
	incomeTotal: number | null,
	checkingTotal: number | null,
	savingsTotal: number | null,

}
const history = createBrowserHistory();
class NavBar extends React.Component<NavBarProps, NavBarState> {
	constructor(props: NavBarProps){
		super(props);
		this.state = {
			firstName: '', 
			lastName: '', 
			beginChecking: null,
			beginSavings: null,
			incomeTotal: null,
			checkingTotal: null,
			savingsTotal: null,
		}
		this.useStyles = this.useStyles.bind(this);
		this.getData = this.getData.bind(this);

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
		this.getData();
	}

	getData = () => {
		fetch(`${APIURL}/user/name`, {
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
	}

	
	render(){
		return(
			<div>
			
				
		
				<Router history={history}>
					    <AppBar position="fixed" className="myNavBar">
							<Toolbar>
								<Typography variant="h6">
									Welcome: <code>{this.state.firstName + ' ' + this.state.lastName}</code>&nbsp;&nbsp;
								</Typography>
								<Button color="inherit"><Link to="/dashboard">Dashboard</Link></Button>
								<Button color="inherit"><Link to='/checking'>Checking</Link></Button>
								<Button color="inherit"><Link to='/savings'>Savings</Link></Button>
								{/* <Button color="inherit"><Link to='/budget'>Budget</Link></Button> */}
								<Button color="inherit"><Link to='/settings'>Settings</Link></Button>
								<Button color="inherit" onClick={this.props.clearToken}><Link to=''>Logout</Link></Button>
							</Toolbar>
						</AppBar>
						{/* This is where the liquid totals go */}
				<Switch>
					<Route exact path="/dashboard"><Dashboard token={this.props.token} /></Route>
					<Route exact path="/"><Dashboard token={this.props.token} /></Route>
					<Route exact path="/checking"><Checking token={this.props.token} /></Route>
					<Route exact path="/savings"><Savings token={this.props.token} /></Route>
					{/* <Route exact path="/budget"><Budget token={this.props.token} /></Route> */}
					<Route exact path="/settings"><Settings clearToken={this.props.clearToken} token={this.props.token}/></Route>
				</Switch>
				</Router>
				
			</div>
		)
	}
}

export default NavBar;