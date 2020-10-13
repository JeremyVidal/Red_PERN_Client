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
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
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
	updateMessage: string,
	checkingCategory: string,
	savingsCategory: string,
	checkingType: string,
	savingsType: string,
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
		maxHeight: 500,
		overflowY: 'scroll',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	cardheight: {
		maxHeight: 300,
		overflowY: 'scroll',
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
			updateMessage: '',
			checkingCategory: '',
			savingsCategory: '',
			checkingType: '',
			savingsType: '',
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
		this.deleteCheckingCategory = this.deleteCheckingCategory.bind(this);
		this.deleteSavingsCategory = this.deleteSavingsCategory.bind(this);
		this.deleteCheckingTypes = this.deleteCheckingTypes.bind(this);
		this.deleteSavingsTypes = this.deleteSavingsTypes.bind(this);
		this.addCheckingCategory = this.addCheckingCategory.bind(this);
		this.addSavingsCategory = this.addSavingsCategory.bind(this);
		this.addCheckingType = this.addCheckingType.bind(this);
		this.addSavingsType = this.addSavingsType.bind(this);
		this.handleCategoryTypeChange = this.handleCategoryTypeChange.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
		this.getBeginBalance = this.getBeginBalance.bind(this);
		this.getCheckingCatgegories = this.getCheckingCatgegories.bind(this);
		this.getCheckingTypes = this.getCheckingTypes.bind(this);
		this.getSavingsCatgegories = this.getSavingsCatgegories.bind(this);
		this.getSavingsTypes = this.getSavingsTypes.bind(this);


	}
	handleCategoryTypeChange = (event:any) => {
		event.preventDefault();
		const { name, value } = event.target;
		this.setState(Object.assign(this.state, { [name]: value}));
	}

	addCheckingCategory = (event:any) => {
		event.preventDefault();
		let userObject = {
			checkingCategory: this.state.checkingCategory,
		};
		fetch('http://localhost:4000/checkingCategories/create', {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": this.props.token
			}),
			body: JSON.stringify(userObject),
		})
		.then(() => {
			this.getCheckingCatgegories(this.props.token);
		})
	}

	addSavingsCategory = (event:any) => {
		event.preventDefault();
		let userObject = {
			savingsCategory: this.state.savingsCategory,
		};
		fetch('http://localhost:4000/savingsCategories/create', {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": this.props.token
			}),
			body: JSON.stringify(userObject),
		})
		.then(() => {
			this.getSavingsCatgegories(this.props.token);
		})
	}

	addCheckingType = (event:any) => {
		event.preventDefault();
		// console.log(this.state.checkingType)
		let userObject = {
			checkingType: this.state.checkingType,
		};
		fetch('http://localhost:4000/checkingTypes/create', {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": this.props.token
			}),
			body: JSON.stringify(userObject),
		})
		.then(() => {
			this.getCheckingTypes(this.props.token);
		})
	}

	addSavingsType = (event:any) => {
		event.preventDefault();
		let userObject = {
			savingsType: this.state.savingsType,
		};
		fetch('http://localhost:4000/savingsTypes/create', {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": this.props.token
			}),
			body: JSON.stringify(userObject),
		})
		.then(() => {
			this.getSavingsTypes(this.props.token);
		})
	}

	deleteSavingsTypes = (event:any, id:number) => {
		event.preventDefault();
		this.setState({open: false});
		fetch(`http://localhost:4000/savingsTypes/${id}`, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': this.props.token
			})
		})
		.then(() => {
			this.getSavingsTypes(this.props.token);
		})
	}
	deleteCheckingTypes = (event:any, id:number) => {
		event.preventDefault();
		this.setState({open: false});
		fetch(`http://localhost:4000/checkingTypes/${id}`, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': this.props.token
			})
		})
		.then(() => {
			this.getCheckingTypes(this.props.token);
		})
	}
	deleteSavingsCategory = (event:any, id:number) => {
		event.preventDefault();
		this.setState({open: false});
		fetch(`http://localhost:4000/savingsCategories/${id}`, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': this.props.token
			})
		})
		.then(() => {
			this.getSavingsCatgegories(this.props.token);
		})
	}
	deleteCheckingCategory = (event:any, id:number) => {
		event.preventDefault();
		this.setState({open: false});
		fetch(`http://localhost:4000/checkingCategories/${id}`, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Authorization': this.props.token
			})
		})
		.then(() => {
			this.getCheckingCatgegories(this.props.token);
		})
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
		.then(() => {this.props.clearToken();})
	}

	handleInfoChange = (event : any) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;
		switch (name) {	
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
					password: this.state.password
				}),
				headers: new Headers({
					"Content-Type": "application/json",
					'Accept': 'application/json',
					"Authorization": this.props.token,
				}),
				})
			.then((response) => response.json())

			fetch('http://localhost:4000/beginBalance/update', {
				method: "PUT",
				body: JSON.stringify({						
					checking: this.state.beginCheckingAmount,
					savings: this.state.beginSavingsAmount,
				}),
				headers: new Headers({
					"Content-Type": "application/json",
					'Accept': 'application/json',
					"Authorization": this.props.token,
				}),
				})
			.then((response) => response.json())
			.then(() => 
				this.setState({updateMessage: 'Successfully Updated Your Information!'}),
				this.state.password !== '' && this.state.password !== null && this.state.password !== undefined 
				? this.props.clearToken()
				: null
				)
			}
			
		else{
			this.setState({firstName: ''})
			this.setState({lastName: ''})
			this.setState({email: ''})
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
		window.scrollTo(0, 0)
		this.getUserInfo(this.props.token)
		this.getBeginBalance(this.props.token)
		this.getCheckingCatgegories(this.props.token)
		this.getCheckingTypes(this.props.token)
		this.getSavingsCatgegories(this.props.token)
		this.getSavingsTypes(this.props.token)
	}

	getUserInfo = (token:any) => {
		fetch('http://localhost:4000/user', {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": token,
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			this.setState({firstName: data.firstName})
			this.setState({lastName: data.lastName})
			this.setState({email: data.email})
		})
	}
	getBeginBalance = (token:any) => {
		fetch('http://localhost:4000/beginBalance', {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				"Authorization": token,
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			this.setState({beginCheckingAmount: data.checking})
			this.setState({beginSavingsAmount: data.savings})
		})
	}
	getCheckingCatgegories = (token:any) => {
		fetch('http://localhost:4000/checkingCategories/', {
			method: "GET",
			headers: new Headers({
				"Authorization": token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({checkingCategories: data })			  
		})
	}
	getCheckingTypes = (token:any) => {
		fetch('http://localhost:4000/checkingTypes/', {
			method: "GET",
			headers: new Headers({
				"Authorization": token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({checkingTypes: data })			  

		})
	}
	getSavingsCatgegories = (token:any) => {
		fetch('http://localhost:4000/savingsCategories/', {
			method: "GET",
			headers: new Headers({
				"Authorization": token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({savingsCategories: data })			  
		})
	}
	
	getSavingsTypes = (token:any) => {
		fetch('http://localhost:4000/savingsTypes/', {
			method: "GET",
			headers: new Headers({
				"Authorization": token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({savingsTypes: data })			  
	
		})
	}

	


	render(){
		const {errors} = this.state;
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
							{/* &nbsp;&nbsp;{errors.firstName === '' &&  <span style={{color: "red"}}>{errors.firstName}</span>} */}
						</Grid>
						<Grid item xs={6} sm={6}>
							<TextField  onChange={this.handleInfoChange} value={this.state.lastName} variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" />
							{/* &nbsp;&nbsp;{errors.lastName === '' &&  <span style={{color: "red"}}>{errors.lastName}</span>} */}
						</Grid>
						<Grid item xs={4} sm={4}>
							<TextField  onChange={this.handleInfoChange} value={this.state.beginCheckingAmount} autoComplete="bcheckamt" name="beginCheckingAmount" variant="outlined" required fullWidth id="beginCheckingAmount" label="Begin Checking Amount" autoFocus />
							&nbsp;&nbsp;{errors.beginCheckingAmount.length > 0 &&  <span style={{color: "red"}}>{errors.beginCheckingAmount}</span>}
						</Grid>
						<Grid item xs={4} sm={4}>
							<TextField onChange={this.handleInfoChange} value={this.state.beginSavingsAmount}  variant="outlined" required fullWidth id="beginSavingsAmount" label="Begin Savings Amount" name="beginSavingsAmount" autoComplete="bsavamt" />
							&nbsp;&nbsp;{errors.beginSavingsAmount.length > 0 &&  <span style={{color: "red"}}>{errors.beginSavingsAmount}</span>}
						</Grid>
						<Grid item xs={4} sm={4}>
							<TextField  onChange={this.handleInfoChange} value={this.state.email} variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
							&nbsp;&nbsp;{errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<code>{this.state.updateMessage}</code>
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
					<br />
					<br />
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<Button onClick={this.toggle}>Update Password?</Button>
						</Grid>
					</Grid>
					{this.state.togglePassword === true ? 
						<div>
							<hr />
							<br />
							<Typography component="h4" variant="h6"><code>Enter New Password</code></Typography>
							<br />

							<Grid container spacing={3}>
								<Grid item xs={6}>
									<TextField  onChange={this.handleInfoChange}  variant="outlined" required fullWidth name="password" label="Password" type="text" id="password" autoComplete="current-password" />
										&nbsp;&nbsp;{this.state.errors.password.length > 0 &&  <span style={{color: "red"}}>{this.state.errors.password}</span>}
								</Grid>
						
								<Grid item xs={3}>
									<Button onClick={this.handleInfoUpdate} type="submit" fullWidth variant="contained" color="primary" >Update</Button>
								</Grid>
							</Grid>
							<br />
							<hr />
						</div>
						: null
						}
				</form>
				<br />
				<br />
				<Typography component="h4" variant="h6"><code>Update Categories/Types</code></Typography>
				<br />
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Typography component="h3" variant="h6">Checking Categories</Typography>
						<Card className={classes.cardRoot}>
							<CardContent>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell><TextField onChange={this.handleCategoryTypeChange} autoComplete="chcat" name="checkingCategory" variant="outlined" required fullWidth id="checkingCategory" label="Checking Category" autoFocus /></TableCell>
												<TableCell><Button onClick={(e) => this.addCheckingCategory(e)} type="submit" fullWidth variant="contained" color="primary" >Add New</Button></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
											{this.state.checkingCategories.map((data, i) => (
												<TableRow key={i}>
													<TableCell>{data.checkingCategory}</TableCell>
													<TableCell><Button onClick={(e) => this.deleteCheckingCategory(e, data.id)} type="submit" fullWidth variant="contained" color="primary" >Delete</Button></TableCell>
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
						<Typography component="h3" variant="h6">Savings Categories</Typography>
						<Card className={classes.cardRoot}>
							<CardContent>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell><TextField onChange={this.handleCategoryTypeChange} autoComplete="svcat" name="savingsCategory" variant="outlined" required fullWidth id="savingsCategory" label="Savings Category" autoFocus /></TableCell>
												<TableCell><Button onClick={(e) => this.addSavingsCategory(e)} type="submit" fullWidth variant="contained" color="primary" >Add New</Button></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
											{this.state.savingsCategories.map((data, i) => (
												<TableRow key={i}>
													<TableCell>{data.savingsCategory}</TableCell>
													<TableCell><Button onClick={(e) => this.deleteSavingsCategory(e, data.id)} type="submit" fullWidth variant="contained" color="primary" >Delete</Button></TableCell>
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
					<Typography component="h3" variant="h6">Checking Types</Typography>
						<Card className={classes.cardRoot} >
							<CardContent>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell><TextField onChange={this.handleCategoryTypeChange} autoComplete="chtyp" name="checkingType" variant="outlined" required fullWidth id="checkingType" label="Checking Type" autoFocus /></TableCell>
												<TableCell><Button onClick={(e) => this.addCheckingType(e)} type="submit" fullWidth variant="contained" color="primary" >Add New</Button></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
											{this.state.checkingTypes.map((data, i) => (
												<TableRow key={i}>
													<TableCell>{data.checkingType}</TableCell>
													<TableCell><Button onClick={(e) => this.deleteCheckingTypes(e, data.id)} type="submit" fullWidth variant="contained" color="primary" >Delete</Button></TableCell>
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
						<Typography component="h3" variant="h6">Savings Types</Typography>
						<Card className={classes.cardRoot}>
							<CardContent>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell><TextField onChange={this.handleCategoryTypeChange} autoComplete="svtypt" name="savingsType" variant="outlined" required fullWidth id="savingsType" label="Savings Type" autoFocus /></TableCell>
												<TableCell><Button onClick={(e) => this.addSavingsType(e)} type="submit" fullWidth variant="contained" color="primary" >Add New</Button></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
											{this.state.savingsTypes.map((data, i) => (
												<TableRow key={i}>
													<TableCell>{data.savingsType}</TableCell>
													<TableCell><Button onClick={(e) => this.deleteSavingsTypes(e, data.id)} type="submit" fullWidth variant="contained" color="primary" >Delete</Button></TableCell>
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