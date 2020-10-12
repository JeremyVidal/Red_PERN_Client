import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Regex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

interface SettingsProps extends WithStyles<typeof styles>{
	token: string,
	clearToken: any;
}

interface SettingsState {
	open: boolean,
	checkingCategories: any[],
	checkingTypes: any[], 
	savingsCategories: any[],
	savingsTypes: any[], 
	togglePassword: boolean,
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
		password : string,
		email : string,
		beginCheckingAmount: string,
		beginSavingsAmount: string,
		signin: string,
	}
}

const styles = ({ palette, spacing}: Theme) => createStyles({
	cardRoot: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

class Settings extends React.Component<SettingsProps, SettingsState> {
	constructor(props: SettingsProps){
		super(props);
		this.state = {
			open: false,
			checkingCategories: [], 
			checkingTypes: [], 
			savingsCategories: [],
			savingsTypes: [], 
			togglePassword: false,
			inputType: 'password',
			firstName: '',
			lastName: '',
			beginCheckingAmount: 0,
			beginSavingsAmount: 0,
			email: '',
			password: '',
			errors : {
				// firstName: '',
				// lastName: '',
				email : '',
				password : '',
				beginCheckingAmount: '',
				beginSavingsAmount: '',
				signin: '',
			}
		}
		this.toggle = this.toggle.bind(this);
		this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
		this.handleInfoChange = this.handleInfoChange.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

	}
	handleClickOpen = (event:any) => {
		event.preventDefault();
		this.setState({open: true});
	};
	
	handleClose = (event:any) => {
		event.preventDefault();
		this.setState({open: false});
	};
	handleDelete = (event:any) => {
		event.preventDefault();
		this.setState({open: false});
		fetch('http://localhost:4000/user', {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': this.props.token
			})
		})
		.then(res => res.json())
		.catch(err => console.log(err))
		this.props.clearToken();
	}

	handleInfoChange = (event : any) => {
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
				errors.password = errors.password.length < 8 ? '8 characters or longer' : '';
				break;
		}
		this.setState(Object.assign(this.state, { errors, [name]: value}));
	}

	handleInfoUpdate = (event: any) => {
		event.preventDefault();
		let valid = true;
		Object.values(this.state.errors).forEach(
		  	(val) => val.length > 0 && (valid = false)
		);
		if(valid === true){
			fetch('http://localhost:4000/user', {
				method: "PUT",
				body: JSON.stringify({						
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					email: this.state.email,
				}),
				headers: new Headers({
					"Content-Type": "application/json",
					'Accept': 'application/json',
					"Authorization": this.props.token,
				}),
				})
			.then((response) => response.json())
		}
		else{
			this.setState({firstName: ''})
			this.setState({lastName: ''})
			this.setState({email: ''})
		}
	}

	handlePassUpdate = (event: any) => {
		event.preventDefault();
		let valid = true;
		if (this.state.errors.password === ''){
			return valid = false
		}
		if(valid === true){
			fetch('http://localhost:4000/user/pass', {
				method: "PUT",
				body: JSON.stringify({						
					password: this.state.password
				}),
				headers: new Headers({
					"Content-Type": "application/json",
					'Accept': 'application/json',
					"Authorization": this.props.token,
				}),
				})
			.then((response) => response.json())
		}
		else{
			this.setState({password: ''})
		}
	}


	toggle = (event: any) => {
		event.preventDefault();
		if (this.state.togglePassword === false){
			this.setState({togglePassword: true});
		}
		else if(this.state.togglePassword === true){
			this.setState({togglePassword: false});
		}
	}

	componentDidMount = () => {
		fetch('http://localhost:4000/user', {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": this.props.token,
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			this.setState({firstName: data.firstName})
			this.setState({lastName: data.lastName})
			this.setState({email: data.email})
		})

		fetch('http://localhost:4000/beginBalance', {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": this.props.token,
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			this.setState({beginCheckingAmount: data.checking})
			this.setState({beginSavingsAmount: data.savings})
		})

		fetch('http://localhost:4000/checkingCategories/', {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({checkingCategories: [ ...this.state.checkingCategories, ...data ]})			  
		})

		fetch('http://localhost:4000/checkingTypes/', {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({checkingTypes: [ ...this.state.checkingTypes, ...data ]})			  

		})

		fetch('http://localhost:4000/savingsCategories/', {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({savingsCategories: [ ...this.state.savingsCategories, ...data ]})			  
		})

		fetch('http://localhost:4000/savingsTypes/', {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({savingsTypes: [ ...this.state.savingsTypes, ...data ]})			  

		})
	}

	render(){
		const {classes} = this.props;
		return(
			<div className="wrapper">
				<Typography component="h1" variant="h5">Settings Page</Typography>
				<br />
				<br />
				<form>
					<Typography component="h4" variant="h6"><code>Update User Information</code></Typography>
					<br />
					<Grid container spacing={3}>
						<Grid item xs={6} sm={6}>
							<TextField  onChange={this.handleInfoChange}  value={this.state.firstName} autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus />
							{/* &nbsp;&nbsp;{this.state.errors.firstName === '' &&  <span style={{color: "red"}}>{this.state.errors.firstName}</span>} */}
						</Grid>
						<Grid item xs={6} sm={6}>
							<TextField  onChange={this.handleInfoChange} value={this.state.lastName} variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" />
							{/* &nbsp;&nbsp;{this.state.errors.lastName === '' &&  <span style={{color: "red"}}>{this.state.errors.lastName}</span>} */}
						</Grid>
						<Grid item xs={4} sm={4}>
							<TextField  onChange={this.handleInfoChange} value={this.state.beginCheckingAmount} autoComplete="bcheckamt" name="beginCheckingAmount" variant="outlined" required fullWidth id="beginCheckingAmount" label="Begin Checking Amount" autoFocus />
							&nbsp;&nbsp;{this.state.errors.beginCheckingAmount.length > 0 &&  <span style={{color: "red"}}>{this.state.errors.beginCheckingAmount}</span>}
						</Grid>
						<Grid item xs={4} sm={4}>
							<TextField onChange={this.handleInfoChange} value={this.state.beginSavingsAmount}  variant="outlined" required fullWidth id="beginSavingsAmount" label="Begin Savings Amount" name="beginSavingsAmount" autoComplete="bsavamt" />
							&nbsp;&nbsp;{this.state.errors.beginSavingsAmount.length > 0 &&  <span style={{color: "red"}}>{this.state.errors.beginSavingsAmount}</span>}
						</Grid>
						<Grid item xs={4} sm={4}>
							<TextField  onChange={this.handleInfoChange} value={this.state.email} variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
							&nbsp;&nbsp;{this.state.errors.email.length > 0 &&  <span style={{color: "red"}}>{this.state.errors.email}</span>}
						</Grid>
					</Grid>
					<br />
					<br />
					<Grid container spacing={3}>	
						<Grid container spacing={3}>
							<Grid item xs={3}>
								<Button onClick={this.handleInfoUpdate} type="submit" fullWidth variant="contained" color="primary" >Update</Button>
							</Grid>
							<Grid item xs={3}>
								<Button onClick={this.handleClickOpen} type="submit" fullWidth variant="contained" color="primary" >Delete</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
				<br />
				<form>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<Button onClick={this.toggle}>Update Password?</Button>
						</Grid>
					</Grid>
					<br />
						{this.state.togglePassword === true ? 
						<div>
							<hr />
							<br />
							<Typography component="h4" variant="h6"><code>Enter New Password</code></Typography>
							<br />

							<Grid container spacing={3}>
								<Grid item xs={6}>
									<TextField  onChange={this.handleInfoUpdate}  variant="outlined" required fullWidth name="password" label="Password" type="text" id="password" autoComplete="current-password" />
										&nbsp;&nbsp;{this.state.errors.password.length > 0 &&  <span style={{color: "red"}}>{this.state.errors.password}</span>}
								</Grid>
						
								<Grid item xs={3}>
									<Button onClick={this.handlePassUpdate} type="submit" fullWidth variant="contained" color="primary" >Update</Button>
								</Grid>
							</Grid>
							<br />
							<hr />
						</div>
						: null
						}
				</form>
				<br />
				<Typography component="h4" variant="h6"><code>Update Categories/Types</code></Typography>
				<br />
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Card className={classes.cardRoot}>
							<CardContent>
								<Typography component="h3" variant="h6">Checking Categories</Typography>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell><TextField autoComplete="chcat" name="checkingCategory" variant="outlined" required fullWidth id="checkingCategory" label="Checking Category" autoFocus /></TableCell>
												<TableCell><Button type="submit" fullWidth variant="contained" color="primary" >Add New</Button></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
											{this.state.checkingCategories.map((data, i) => (
												<TableRow key={i}>
													<TableCell>{data.checkingCategory}</TableCell>
													<TableCell><Button type="submit" fullWidth variant="contained" color="primary" >Delete</Button></TableCell>
												</TableRow>
											))}	
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={6}>		
						<Card className={classes.cardRoot}>
							<CardContent>
								<Typography component="h3" variant="h6">Savings Categories</Typography>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell><TextField autoComplete="svcat" name="savingsCategory" variant="outlined" required fullWidth id="savingsCategory" label="Savings Category" autoFocus /></TableCell>
												<TableCell><Button type="submit" fullWidth variant="contained" color="primary" >Add New</Button></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
											{this.state.savingsCategories.map((data, i) => (
												<TableRow key={i}>
													<TableCell>{data.savingsCategory}</TableCell>
													<TableCell><Button type="submit" fullWidth variant="contained" color="primary" >Delete</Button></TableCell>
												</TableRow>
											))}	
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</CardContent>
						</Card>						
					</Grid>
				</Grid>
				<br />
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Card className={classes.cardRoot}>
							<CardContent>
								<Typography component="h3" variant="h6">Checking Types</Typography>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell><TextField autoComplete="chtyp" name="checkingTypes" variant="outlined" required fullWidth id="checkingTypes" label="Checking Types" autoFocus /></TableCell>
												<TableCell><Button type="submit" fullWidth variant="contained" color="primary" >Add New</Button></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
											{this.state.checkingTypes.map((data, i) => (
												<TableRow key={i}>
													<TableCell>{data.checkingType}</TableCell>
													<TableCell><Button type="submit" fullWidth variant="contained" color="primary" >Delete</Button></TableCell>
												</TableRow>
											))}	
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={6}>		
						<Card className={classes.cardRoot}>
							<CardContent>
								<Typography component="h3" variant="h6">Savings Types</Typography>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell><TextField autoComplete="svtypt" name="savingsTypes" variant="outlined" required fullWidth id="savingsTypes" label="Savings Types" autoFocus /></TableCell>
												<TableCell><Button type="submit" fullWidth variant="contained" color="primary" >Add New</Button></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
											{this.state.savingsTypes.map((data, i) => (
												<TableRow key={i}>
													<TableCell>{data.savingsType}</TableCell>
													<TableCell><Button type="submit" fullWidth variant="contained" color="primary" >Delete</Button></TableCell>
												</TableRow>
											))}	
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</CardContent>
						</Card>						
					</Grid>
				</Grid>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Are you sure you want to Delete your profile?"}</DialogTitle>
					<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This cannot be undone!
					</DialogContentText>
					</DialogContent>
					<DialogActions>
					<Button onClick={this.handleClose} color="primary">
						No Close
					</Button>
					<Button onClick={this.handleDelete} color="primary" autoFocus>
						Yes Delete
					</Button>
					</DialogActions>
				</Dialog>

			</div>
		)
	}
}

export default withStyles(styles)(Settings);