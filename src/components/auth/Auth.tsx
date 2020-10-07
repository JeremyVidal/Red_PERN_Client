import React, { Component } from 'react';
import {
	Container,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
  } from "reactstrap";

class Auth extends Component {
	constructor(props: string){
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			login: false,
		}
		this.toggleButton = this.toggleButton.bind(this);
	}

	toggleButton(){
		this.setState({login: true});
	}
	render(){
		return(
			<div>
				<Container>
					<Form>
						<FormGroup>
							<Label htmlFor="firstName">First Name</Label><br />
							<Input name="firstName" type="text" required/><br />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="lastName">Last Name</Label><br />
							<Input name="lastName" type="text" required/><br />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="beginCheckingAmount">Begin Checking Amount</Label><br />
							<Input name="beginCheckingAmount" type="number" min="0.00" step="0.01"/><br />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="beginSavingsAmount">Begin Savings Amount</Label><br />
							<Input name="beginSavingsAmount" type="number" min="0.00" step="0.01"/><br />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="email">Email</Label><br />
							<Input name="email" type="email" required/><br />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="password">Password</Label><br />
							<Input name="password" type="password" required/><br />	
						</FormGroup>
					</Form>
					<div className="d-flex justify-content-between">
						<Button color="warning" type="submit">Sign Up</Button>
						<Button color="success" className="toggle_button" >Toggle Here</Button>
					</div>
				</Container>
			</div>
		)
	}
}

export default Auth;