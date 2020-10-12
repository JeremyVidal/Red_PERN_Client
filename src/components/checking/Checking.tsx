import React from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';


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
	checkingAmount: number,
	open: boolean,
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
			open: false,
		}
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptChange = this.handleDescriptChange.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getData = this.getData.bind(this);
		this.editRecord = this.editRecord.bind(this);
		this.deleteRecord = this.deleteRecord.bind(this);
		this.getModalStyle = this.getModalStyle.bind(this);
		this.getModalStyle = this.getModalStyle.bind(this);
		this.rand = this.rand.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.modalBoday = this.modalBoday.bind(this);

	}
	handleOpen = () => {
		this.setState({open: true});
	};
	
	handleClose = () => {
		this.setState({open: false});
	};
	rand() {
		return Math.round(Math.random() * 20) - 10;
	}
	modalBoday = () => {

	}
	getModalStyle =() => {
		const top = 50 + this.rand();
		const left = 50 + this.rand();
	  
		return {
		  	top: `${top}%`,
		  	left: `${left}%`,
		  	transform: `translate(-${top}%, -${left}%)`,
		};

	}
	deleteRecord = (event:any, id:number) => {
		event.preventDefault();
		if (id){
			let url = `http://localhost:4000/checking/${id}`;
			fetch(url, {
				method: 'DELETE',
				headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': this.props.token
				})
			})
		.then(res => res.json())
		.catch(err => console.log(err))}
	}
	editRecord = (event:any, id:number) => {
		event.preventDefault();
		console.log(`THIS IS THE RECORD ID: ${id}`)
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
				// this.getData(this.props.token);
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
					<Typography component="h1" variant="h5">Create Checking Transaction</Typography>

						<FormControl>
							<Grid container spacing={3}>
							<Grid item xs={6}>
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
							</Grid>
							<Grid item xs={6}>
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
							</Grid>
						</Grid>
						</FormControl>
						<br />
						<FormControl>
							<Grid container spacing={3}>
								<Grid item xs={6}>
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
								</Grid>
								<Grid item xs={6}>
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
								</Grid>
							</Grid>
						</FormControl>
						<br />
						<FormControl>
							<Grid container spacing={3}>
								<Grid item xs={6}>
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
								</Grid>
								<Grid item xs={6}>
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
								</Grid>
							</Grid>
						</FormControl>
						<br />
							<Grid container spacing={3}>
								<Grid item xs={12}>
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
								</Grid>
							</Grid>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<FormControl>
									<Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary" >Add</Button>
								</FormControl>
							</Grid>
						</Grid>
					</div>
				</form>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TableContainer>
							<br />
							<Typography component="h1" variant="h5">Checking Transactions</Typography>
							<Table className={classes.table} size="small" aria-label="a dense table">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Time</TableCell>
										<TableCell>Category</TableCell>
										<TableCell>Type</TableCell>
										<TableCell>Name</TableCell>
										{/* <TableCell>Description</TableCell> */}
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
										{/* <TableCell>{data.checkingDescription}</TableCell> */}
										<TableCell>${data.checkingAmount}</TableCell>
										<TableCell><Button onClick={(e) => this.editRecord(e, data.id) } type="submit" variant="contained" color="primary" >Edit</Button></TableCell>
										<TableCell><Button onClick={(e) => this.deleteRecord(e, data.id) } type="submit" variant="contained" color="primary" >Delete</Button></TableCell>
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
}

export default withStyles(styles)(Checking);