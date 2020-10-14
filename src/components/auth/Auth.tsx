import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import APIURL from "../../helpers/environment";

const Regex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

interface AuthProps extends WithStyles<typeof styles> {
	updateToken: any;
	clearToken: any;
 }
 interface AuthState {
	login: boolean,
	message: string,
	inputType: string,
	firstName : string,
	lastName: string,
	beginCheckingAmount: number,
	beginSavingsAmount: number,
	email : string,
	password : string,
	errors : {
		// firstName: string,
		// lastName: string,
		email : string,
		password : string,
		beginCheckingAmount: string,
		beginSavingsAmount: string,
		signin: string,
	}
 }

 function Copyright() {
	return (
	  	<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}&nbsp; Arcane LLC {' '}
			{new Date().getFullYear()}
			{'.'}
			<br /><br />
			<Link color="inherit" target="_blank" href="https://documenter.getpostman.com/view/9337021/TVRoZ7Bz#4a6ceab6-67a9-4890-858d-b3d6d63df5b3">
		  		API Documentation
			</Link>
	  	</Typography>
	);
  }

 const styles = ({ palette, spacing}: Theme) => createStyles({
	paper: {
	  marginTop: spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	avatar: {
	  margin: spacing(1),
	  backgroundColor: palette.primary.dark,
	},
	input: {
		backgroundColor: 'white',
	},
	form: {
	  width: '100%',
	  marginTop: spacing(3),
	},
	submit: {
	  margin: spacing(3, 0, 2),
	},
  });

class Auth extends React.Component<AuthProps, AuthState> {
	
	constructor(props: AuthProps){
		super(props);
		const initialState = {
			login: true,
			message: '',
			inputType: 'password',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			beginCheckingAmount: 0,
			beginSavingsAmount: 0,
			errors : {
				// firstName: '',
				// lastName: '',
				email : '',
				password : '',
				beginCheckingAmount: '',
				beginSavingsAmount: '',
				signin: '',
			},
		}
		this.state = initialState;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggle = this.toggle.bind(this);
		this.title = this.title.bind(this);
		this.label = this.label.bind(this);

	}
	toggle = (event: any) => {
		event.preventDefault();
		if (this.state.login === false){
			this.setState({login: true});
			this.setState({email: ''});
			this.setState({password: ''});

		}
		else if(this.state.login === true){
			this.setState({login: false});
			this.setState({email: ''});
			this.setState({password: ''});
		}
		if (this.state.inputType === 'password'){
			this.setState({inputType: 'text'});
		}
		else if(this.state.inputType === 'text'){
			this.setState({inputType: 'password'});
		}
	}
	handleChange = (event : any) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;
		switch (name) {
			// case 'firstName':
			// 	errors.firstName = value >= 0 && value !== '' ? '' : 'Cannot be empty';
			// 	break;	
			// case 'lastName':
			// 	errors.lastName = value >= 0 && value !== '' ? '' : 'Cannot be empty';
			// 	break;	
			case 'beginCheckingAmount':
				errors.beginCheckingAmount = value >= 0 && value !== '' ? '' : '0 or greater amount';
				break;	
			case 'beginSavingsAmount':
				errors.beginSavingsAmount = value >= 0  && value !== '' ? '' : '0 or greater amount';
				break;					
			case 'email':
				errors.email =  Regex.test(value) ? '' : 'Email is not valid';
				break;
			case 'password':
				errors.password = value.length < 8 ? '8 characters or longer' : '';
				break;
		}
		this.setState(Object.assign(this.state, { errors, [name]: value}));
	}
	handleSubmit = (event: any) => {
		event.preventDefault();
		let valid = true;
		Object.values(this.state.errors).forEach(
		  	(val) => val.length > 0 && (valid = false)
		);
		if(valid === true){
			let userObject = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
			};
			let url = this.state.login === true 
			? `${APIURL}/user/login`
			: `${APIURL}/user/signup`;
			fetch(url, {
				method: "POST",
				headers: new Headers({
					"Content-Type": "application/json",
				}),
				body: JSON.stringify(userObject),
			})
			.then((res) => res.json())
			.then((data) => {
				this.props.updateToken(data.sessionToken, data.user.admin, data.user.id);
				let userAmount = {
					checking: this.state.beginCheckingAmount,
					savings: this.state.beginSavingsAmount,
				};
				fetch(`${APIURL}/beginBalance/create`, {
					method: "POST",
					headers: new Headers({
						"Authorization": data.sessionToken,
						"Content-Type": "application/json",
					}),
					body: JSON.stringify(userAmount),
				})
				this.setState({message: ''})
				// console.log(data.sessionToken);
				// console.log(data.user.admin);
				// console.log(data.user.id);

			})
			.catch(() => this.setState({message: 'Authentication Error!'})
			);
		}
		else{
			this.setState({message: 'Authentication Error!'})
			// console.log("Authentication Error!")
			this.setState({firstName: ''});
			this.setState({lastName: ''});
			this.setState({beginCheckingAmount: 0});
			this.setState({beginSavingsAmount: 0});
			this.setState({email: ''});
			this.setState({password: ''});
		}
	}

	title = () => {
		if (this.state.login === true ){
			return "Login"
		}
		else {
			return "SignUp"
		}
	}
	label = () => {
		if (this.state.login !== true ){
			return "Go to Login"
		}
		else {
			return "Go to SignUp"
		}
	}
	render(){
		const {errors} = this.state;
		const {classes} = this.props;
		return(
			<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5"><code>Welcome to Budget Tracker</code></Typography>
				<br />
				  	<Avatar className={classes.avatar}>
						{this.state.login === true ? 
							<LockOutlinedIcon />
						:
							<LockOpenIcon />
						}
				 	</Avatar>
				  	<Typography component="h1" variant="h5">
					  	{this.title()}
				  	</Typography>
				  	<form className={classes.form} onSubmit={this.handleSubmit}>
						{this.state.login === false ? (
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField onChange={this.handleChange} className={classes.input} autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus />
									{/* &nbsp;&nbsp;{errors.firstName === '' &&  <span style={{color: "red"}}>{errors.firstName}</span>} */}
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField onChange={this.handleChange} className={classes.input} variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" />
									{/* &nbsp;&nbsp;{errors.lastName === '' &&  <span style={{color: "red"}}>{errors.lastName}</span>} */}
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField onChange={this.handleChange} className={classes.input} autoComplete="bcheckamt" name="beginCheckingAmount" variant="outlined" required fullWidth id="beginCheckingAmount" label="Begin Checking Amount" autoFocus />
									&nbsp;&nbsp;{errors.beginCheckingAmount.length > 0 &&  <span style={{color: "red"}}>{errors.beginCheckingAmount}</span>}
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField onChange={this.handleChange} className={classes.input} variant="outlined" required fullWidth id="beginSavingsAmount" label="Begin Savings Amount" name="beginSavingsAmount" autoComplete="bsavamt" />
									&nbsp;&nbsp;{errors.beginSavingsAmount.length > 0 &&  <span style={{color: "red"}}>{errors.beginSavingsAmount}</span>}
								</Grid>
							</Grid>
						) : null}
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField onChange={this.handleChange} className={classes.input} variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
								&nbsp;&nbsp;{errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}
							</Grid>
							<Grid item xs={12}>
								<TextField onChange={this.handleChange} className={classes.input} variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
								&nbsp;&nbsp;{errors.password.length > 0 &&  <span style={{color: "red"}}>{errors.password}</span>}
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<code>{this.state.message}</code>
							</Grid>
						</Grid>
						<Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary" >{this.title()}</Button>
						<Button onClick={this.toggle} className={classes.submit} type="submit" fullWidth variant="contained" color="primary" >{this.label()}</Button>
				  </form>
			</div>
			<Box mt={5}>
        		<Copyright />
     		</Box>
		  </Container>
		)
	}
}

export default withStyles(styles)(Auth);