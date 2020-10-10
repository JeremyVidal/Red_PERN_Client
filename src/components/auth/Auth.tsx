import React from 'react';
import { Redirect } from 'react-router-dom';

const Regex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

interface AuthProps {
	updateToken: any;
	clearToken: any;
 }
 interface AuthState {
	login: boolean,
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

class Auth extends React.Component<AuthProps, AuthState> {
	
	constructor(props: AuthProps){
		super(props);
		const initialState = {
			login: true,
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
			} ,
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
		}
		else if(this.state.login === true){
			this.setState({login: false});
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
			case 'beginCheckingAmount':
				errors.beginCheckingAmount = value >= 0 && value !== '' ? '' : 'Required 0 or greater amount!';
				break;	
			case 'beginSavingsAmount':
				errors.beginSavingsAmount = value >= 0  && value !== '' ? '' : 'Required 0 or greater amount!';
				break;					
			case 'email':
				errors.email =  Regex.test(value) ? '' : 'Email is not valid!';
				break;
			case 'password':
				errors.password = value.length < 8 ? 'Password must be 8 characters long!' : '';
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
			? 'http://localhost:4000/user/login'
			: 'http://localhost:4000/user/signup';
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
				fetch('http://localhost:4000/beginBalance/create', {
					method: "POST",
					headers: new Headers({
						"Authorization": data.sessionToken,
						"Content-Type": "application/json",
					}),
					body: JSON.stringify(userAmount),
				})
				// console.log(data.sessionToken);
				// console.log(data.user.admin);
				// console.log(data.user.id);

			})
			.catch((err) => console.log(err));
		}
		else{
			console.log("Authentication Error!!!")
			this.setState({firstName: ''});
			this.setState({lastName: ''});
			this.setState({beginCheckingAmount: 0});
			this.setState({beginSavingsAmount: 0});
			this.setState({email: ''});
			this.setState({password: ''});
		}
	}

	handleLogin = () => {
		return <Redirect to="/Login"/>
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

		return(
			<div>
				<form onSubmit={this.handleSubmit}>
				<h2>{this.title()}</h2>
					{this.state.login === false ? (
						<div>
							<div >
								<label htmlFor="firstName">First Name</label><br />
								<input name="firstName" type="text" required onChange={this.handleChange}/>
								{/* {errors.firstName.length > 0 &&  <span style={{color: "red"}}>{errors.firstName}</span>} */}
							</div>
							<div >
								<label htmlFor="lastName">Last Name</label><br />
								<input name="lastName" type="text" required onChange={this.handleChange}/>
								{/* {errors.lastName.length > 0 &&  <span style={{color: "red"}}>{errors.lastName}</span>} */}
							</div>
							<div >
								<span><label htmlFor="beginCheckingAmount">Begin Checking Amount</label>&nbsp;&nbsp;{errors.beginCheckingAmount.length > 0 &&  <span style={{color: "red"}}>{errors.beginCheckingAmount}</span>}</span><br />
								<input name="beginCheckingAmount" type="number" min="0.00" step="0.01" required onChange={this.handleChange}/>
							</div>
							<div >
								<span><label htmlFor="beginSavingsAmount">Begin Savings Amount</label>&nbsp;&nbsp;{errors.beginSavingsAmount.length > 0 &&  <span style={{color: "red"}}>{errors.beginSavingsAmount}</span>}</span><br />
								<input name="beginSavingsAmount" type="number" min="0.00" step="0.01" required onChange={this.handleChange}/>
							</div>
						</div>
					) : null}
					<div>
						<div >
							<span><label htmlFor="email">Email</label>&nbsp;&nbsp;{errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}</span><br />
							<input name="email" type="email" required onChange={this.handleChange}/>
						</div>
						<div >
							<span><label htmlFor="password">Password</label>&nbsp;&nbsp;{errors.password.length > 0 &&  <span style={{color: "red"}}>{errors.password}</span>}</span><br />
							<input name="password" type={this.state.inputType} required onChange={this.handleChange}/>
						</div>
						<br />
						<div >
							<button className="button" >{this.title()}</button>
							<button className="button" onClick={this.toggle}>{this.label()}</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default Auth;