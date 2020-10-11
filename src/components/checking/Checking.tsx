import React from 'react';
import './Checking.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

interface CheckingProps extends WithStyles<typeof styles>{
	userid: number,
	token: string,
}

interface CheckingState {
	categories: any[],
	types: any[], 
	checking: any[], 
	checkingDate: any,
	checkingTime: any,
	checkingCategory: string,
	checkingType: string,
	checkingName: string,
	checkingDescription: string,
	checkingAmount: number
}

const styles = ({ palette, spacing}: Theme) => createStyles({
	root: {
		'& .MuiTextField-root': {
		  margin: spacing(1),
		  width: '25ch',
		},
	},
	table: {
		minWidth: 650,
	},
	submit: {
		margin: spacing(3, 0, 2),
	},
});


class Checking extends React.Component<CheckingProps, CheckingState> {
	constructor(props: CheckingProps){
		super(props);
		this.state = {
			categories: [], 
			types: [], 
			checking: [],
			checkingDate: null,
			checkingTime: null,
			checkingCategory: '',
			checkingType: '',
			checkingName: '',
			checkingDescription: '',
			checkingAmount: 0,
		}
		this.displaytransactions = this.displaytransactions.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptChange = this.handleDescriptChange.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getData = this.getData.bind(this);

	}
	handleDateChange = (event: any) => {
		event.preventDefault();
		this.setState({checkingDate: event.target.value})
	};
	handleTimeChange = (event: any) => {
		event.preventDefault();
		this.setState({checkingTime: event.target.value})
	};
	handleCategoryChange = (event: any) => {
		event.preventDefault();
		this.setState({checkingCategory: event.target.value})
	};
	handleTypeChange = (event: any) => {
		event.preventDefault();
		this.setState({checkingType: event.target.value})
	};
	handleNameChange = (event: any) => {
		event.preventDefault();
		this.setState({checkingName: event.target.value})
	};
	handleDescriptChange = (event: any) => {
		event.preventDefault();
		this.setState({checkingDescription: event.target.value})
	};
	handleAmountChange = (event: any) => {
		event.preventDefault();
		this.setState({checkingAmount: event.target.value})
	};

	displaytransactions = () => {
		const {classes} = this.props;
		return (
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TableContainer>
							<br />
							<hr />
							<h2>Checking</h2>
							<Table className={classes.table} size="small" aria-label="a dense table">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Time</TableCell>
										<TableCell>Category</TableCell>
										<TableCell>Type</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Description</TableCell>
										<TableCell>Amount</TableCell>
										<TableCell></TableCell>
										<TableCell></TableCell>

									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.checking.map((data, i) => (
									<TableRow key={i}>
										<TableCell>{data.checkingDate}</TableCell>
										<TableCell>{data.checkingTime}</TableCell>
										<TableCell>{data.checkingCategory}</TableCell>
										<TableCell>{data.checkingType}</TableCell>
										<TableCell>{data.checkingName}</TableCell>
										<TableCell>{data.checkingDescription}</TableCell>
										<TableCell>${data.checkingAmount}</TableCell>
										<TableCell><Button type="submit" variant="contained" color="primary" >Edit</Button></TableCell>
										<TableCell><Button type="submit" variant="contained" color="primary" >Delete</Button></TableCell>
									</TableRow>
									))}	
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</div>
		)
	}

	handleSubmit = (event:any) => {
		event.preventDefault();
		fetch('http://localhost:4000/checking/create', {
			method: "POST",
			body: JSON.stringify({
				checkingDate: this.state.checkingDate,
				checkingTime: this.state.checkingTime,
				checkingCategory: this.state.checkingCategory,
				checkingType: this.state.checkingType,
				checkingName: this.state.checkingName,
				checkingDescription: this.state.checkingDescription,
				checkingAmount: this.state.checkingAmount,
			}),
			headers: new Headers({
			  "Content-Type": "application/json",
			  "Authorization": this.props.token,
			}),
		  })
		  .then((res) => res.json())
		  .then(()=> {
			  this.setState({checkingDate: ''})
			  this.setState({checkingTime: ''})
			  this.setState({checkingCategory: ''})
			  this.setState({checkingType: ''})
			  this.setState({checkingName: ''})
			  this.setState({checkingDescription: ''})
			  this.setState({checkingAmount: 0})
			})
	}
	componentDidMount = () => {
		this.getData(this.props.token);
	}
	getData = (token: any) => {
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
			this.setState({categories: [ ...this.state.categories, ...data ]})			  
		})
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
			this.setState({types: [ ...this.state.types, ...data ]})			  

		})
		fetch('http://localhost:4000/checking', {
			method: "GET",
			headers: new Headers({
				"Authorization": token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({checking: [ ...this.state.checking, ...data ]})			  
		})
	}
	render(){
		const {classes} = this.props;
		return(
			<div className="wrapper">
				<form onSubmit={this.handleSubmit} className={classes.root} autoComplete="off">
      				<div>
					  <TextField
							id="standard-required"
							required
							label="Date"
							value= {this.state.checkingDate}
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.handleDateChange}
						/>
						<TextField
							id="standard-required"
							required
							label="Time"
							value= {this.state.checkingTime}
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.handleTimeChange}
						/>
						<TextField
							id="standard-select"
							required
							select
							label="Category"
							value= {this.state.checkingCategory}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.handleCategoryChange}
							>
							{this.state.categories.map((item) => (
								<MenuItem key={item.id} value={item.checkingCategory}>
								{item.checkingCategory}
								</MenuItem>
							))}
						</TextField>
						<TextField
							id="standard-select"
							required
							select
							label="Type"
							value= {this.state.checkingType}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.handleTypeChange}
							>
							{this.state.types.map((item) => (
								<MenuItem key={item.id} value={item.checkingType}>
								{item.checkingType}
								</MenuItem>
							))}
						</TextField>
						<TextField
							id="standard-required"
							required
							label="Name"
							value= {this.state.checkingName}
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.handleNameChange}
						/>
						<TextField
							id="standard-required"
							label="Description"
							value= {this.state.checkingDescription}
							variant="outlined"
							multiline
							rowsMax={4}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.handleDescriptChange}
						/>
						<TextField
							id="outlined-number"
							required
							label="Amount"
							type="number"
							value= {this.state.checkingAmount}
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.handleAmountChange}
						/>
					<Button className={classes.submit}  type="submit" fullWidth variant="contained" color="primary" >Add</Button>
					</div>

				</form>
				{this.displaytransactions()}
			</div>
		)
	}
}

export default withStyles(styles)(Checking);