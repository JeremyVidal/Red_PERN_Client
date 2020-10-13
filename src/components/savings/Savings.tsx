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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface SavingsProps extends WithStyles<typeof styles>{
	token: string,
}

interface SavingsState {
	editid: number,
	editData: any[],
	editopen: boolean,
	categories: any[],
	types: any[], 
	savings: any[], 
	savingsDate: any,
	savingsTime: any,
	savingsCategory: string,
	savingsType: string,
	savingsName: string,
	savingsDescription: string,
	savingsAmount: number,
	editSavingsDate: any,
	editSavingsTime: any,
	editSavingsCategory: string,
	editSavingsType: string,
	editSavingsName: string,
	editSavingsDescription: string,
	editSavingsAmount: number,
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
	tablecontainer: {
		maxHeight: 500,
		overflowY: 'scroll',
	},
	submit: {
		margin: spacing(3, 0, 2),
	},
});


class Savings extends React.Component<SavingsProps, SavingsState> {
	constructor(props: SavingsProps){
		super(props);
		this.state = {
			editid: 0,
			editData: [],
			editopen: false,
			categories: [], 
			types: [], 
			savings: [],
			savingsDate: null,
			savingsTime: null,
			savingsCategory: '',
			savingsType: '',
			savingsName: '',
			savingsDescription: '',
			savingsAmount: 0,
			editSavingsDate: null,
			editSavingsTime: null,
			editSavingsCategory: '',
			editSavingsType: '',
			editSavingsName: '',
			editSavingsDescription: '',
			editSavingsAmount: 0,
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
		this.deleteRecord = this.deleteRecord.bind(this);
		this.getModalStyle = this.getModalStyle.bind(this);
		this.getModalStyle = this.getModalStyle.bind(this);
		this.rand = this.rand.bind(this);
		this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
		this.handleEditClickClose = this.handleEditClickClose.bind(this);
		this.modalBoday = this.modalBoday.bind(this);
		this.handleEditUpdate = this.handleEditUpdate.bind(this);
		this.getEditData = this.getEditData.bind(this);
		this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

	}
	handleUpdateSubmit = (event:any, id:number) => {
		event.preventDefault();
		// console.log(this.state.editCheckingName);
		fetch(`http://localhost:4000/savings/update/${id}`, {
			method: "PUT",
			body: JSON.stringify({						
				savingsDate: this.state.editSavingsDate,
				savingsTime: this.state.editSavingsTime,
				savingsCategory: this.state.editSavingsCategory,
				savingsType: this.state.editSavingsType,
				savingsName: this.state.editSavingsName,
				savingsDescription: this.state.editSavingsDescription,
				savingsAmount: this.state.editSavingsAmount,
			}),
			headers: new Headers({
				"Content-Type": "application/json",
				'Accept': 'application/json',
				"Authorization": this.props.token,
			}),
		})
		.then(() => {
			this.getData(this.props.token);
			this.handleEditClickClose()
		})
	}
	getEditData = (id:number) => {
		fetch(`http://localhost:4000/savings/${id}`, {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({editSavingsDate: data.savingsDate})	
			this.setState({editSavingsTime: data.savingsTime})	
			this.setState({editSavingsCategory: data.savingsCategory})	
			this.setState({editSavingsType: data.savingsType})	
			this.setState({editSavingsName: data.savingsName})	
			this.setState({editSavingsDescription: data.savingsDescription})	
			this.setState({editSavingsAmount: data.savingsAmount})	
			// console.log(data)	  
		})
	}

	handleEditUpdate =(id:number) => {
		fetch(`http://localhost:4000/savings/update/${id}`, {
			method: "PUT",
			body: JSON.stringify({		
				savingsDate: this.state.editSavingsDate,
				savingsTime: this.state.editSavingsTime,
				savingsCategory: this.state.editSavingsCategory,
				savingsType: this.state.editSavingsType,
				savingsName: this.state.editSavingsName,
				savingsDescription: this.state.editSavingsDescription,
				savingsAmount: this.state.editSavingsAmount,
			}),
			headers: new Headers({
				"Content-Type": "application/json",
				'Accept': 'application/json',
				"Authorization": this.props.token,
			}),
			})
			.then(() => {
				this.getData(this.props.token);
			})
	}
	handleEditClickOpen = (event:any, id:number) => {
		event.preventDefault();
		this.getEditData(id);
		this.setState({editid: id})
		this.setState({editopen: true});
		// console.log(this.state.editData)
	};
	
	handleEditClickClose = () => {
		this.setState({editopen: false});
		this.setState({editData: []})
		this.setState({editid: 0})
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
			let url = `http://localhost:4000/savings/${id}`;
			fetch(url, {
				method: 'DELETE',
				headers: new Headers({
					'Content-Type': 'application/json',
					'Authorization': this.props.token
				})
			})
			.then(() => {
				this.getData(this.props.token);
			})
			.catch(err => console.log(err))}
	}

	handleDateChange = (event: any) => {
		event.preventDefault();
		this.setState({savingsDate: event.target.value})
	};
	handleTimeChange = (event: any) => {
		event.preventDefault();
		this.setState({savingsTime: event.target.value})
	};
	handleCategoryChange = (event: any) => {
		event.preventDefault();
		this.setState({savingsCategory: event.target.value})
	};
	handleTypeChange = (event: any) => {
		event.preventDefault();
		this.setState({savingsType: event.target.value})
	};
	handleNameChange = (event: any) => {
		event.preventDefault();
		this.setState({savingsName: event.target.value})
	};
	handleDescriptChange = (event: any) => {
		event.preventDefault();
		this.setState({savingsDescription: event.target.value})
	};
	handleAmountChange = (event: any) => {
		event.preventDefault();
		this.setState({savingsAmount: event.target.value})
	};

	handleUpdatehange = (event : any) => {
		event.preventDefault();
		const { name, value } = event.target;
		this.setState(Object.assign(this.state, {[name]: value}));
	}

	handleSubmit = (event:any) => {
		event.preventDefault();
		fetch('http://localhost:4000/savings/create', {
			method: "POST",
			body: JSON.stringify({
				savingsDate: this.state.savingsDate,
				savingsTime: this.state.savingsTime,
				savingsCategory: this.state.savingsCategory,
				savingsType: this.state.savingsType,
				savingsName: this.state.savingsName,
				savingsDescription: this.state.savingsDescription,
				savingsAmount: this.state.savingsAmount,
			}),
			headers: new Headers({
			  "Content-Type": "application/json",
			  "Authorization": this.props.token,
			}),
		  })
		  .then((res) => res.json())
		  .then(()=> {
				this.setState({savingsDate: ''})
				this.setState({savingsTime: ''})
				this.setState({savingsCategory: ''})
				this.setState({savingsType: ''})
				this.setState({savingsName: ''})
				this.setState({savingsDescription: ''})
				this.setState({savingsAmount: 0})
				this.getData(this.props.token);
			})
	}
	componentDidMount = () => {
		this.getData(this.props.token);
	}
	getData = (token: any) => {
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
			this.setState({categories: data})			  
		})
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
			this.setState({types: data})			  

		})
		fetch('http://localhost:4000/savings', {
			method: "GET",
			headers: new Headers({
				"Authorization": token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({savings: data})			  
		})
	}
	render(){
		const {classes} = this.props;
		return(
			<div className="wrapper">
				<form onSubmit={this.handleSubmit} className={classes.root} autoComplete="off">
      				<div>
					<Typography component="h1" variant="h5">Create Savings Transaction</Typography>

						<FormControl>
							<Grid container spacing={3}>
							<Grid item xs={6}>
								<TextField
									id="standard-required"
									required
									label="Date"
									value= {this.state.savingsDate}
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
									value= {this.state.savingsTime}
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
										value= {this.state.savingsCategory}
										InputLabelProps={{
											shrink: true,
										}}
										onChange={this.handleCategoryChange}
										>
										{this.state.categories.map((item) => (
											<MenuItem key={item.id} value={item.savingsCategory}>
											{item.savingsCategory}
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
										value= {this.state.savingsType}
										InputLabelProps={{
											shrink: true,
										}}
										onChange={this.handleTypeChange}
										>
										{this.state.types.map((item) => (
											<MenuItem key={item.id} value={item.savingsType}>
											{item.savingsType}
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
										value= {this.state.savingsName}
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
										value= {this.state.savingsAmount}
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
						<FormControl>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										id="standard-required"
										label="Description"
										value= {this.state.savingsDescription}
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
										<Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary" >Add</Button>
								</Grid>
							</Grid>
						</FormControl>
					</div>
				</form>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TableContainer className={classes.tablecontainer}>
							<br />
							<Typography component="h1" variant="h5">Savings Transactions</Typography>
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

									{this.state.savings.map((data, i) => (
									<TableRow key={i}>
										<TableCell>{data.savingsDate}</TableCell>
										<TableCell>{data.savingsTime}</TableCell>
										<TableCell>{data.savingsCategory}</TableCell>
										<TableCell>{data.savingsType}</TableCell>
										<TableCell>{data.savingsName}</TableCell>
										{/* <TableCell>{data.savingsDescription}</TableCell> */}
										<TableCell>${data.savingsAmount}</TableCell>
										<TableCell><Button onClick={(e) => this.handleEditClickOpen(e, data.id) } type="submit" variant="contained" color="primary" >Edit</Button></TableCell>
										<TableCell><Button onClick={(e) => this.deleteRecord(e, data.id) } type="submit" variant="contained" color="primary" >Delete</Button></TableCell>
									</TableRow>
									))}	
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>

				<Dialog
					open={this.state.editopen}
					onClose={this.handleEditClickClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Savings transaction update!"}</DialogTitle>
					<DialogContent>
					<DialogContentText id="alert-dialog-description">
						
					<form className={classes.root} autoComplete="off">
      				<div>
					<Typography component="h1" variant="h5">Update Savings Transaction</Typography>

						<FormControl>
							<Grid container spacing={3}>
							<Grid item xs={6}>
								<TextField
									id="standard-required"
									required
									label="Date"
									name="editSavingsDate"
									value= {this.state.editSavingsDate}
									variant="outlined"
									InputLabelProps={{
										shrink: true,
									}}
									onChange={this.handleUpdatehange}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="standard-required"
									required
									label="Time"
									name="editSavingsTime"
									value= {this.state.editSavingsTime}
									variant="outlined"
									InputLabelProps={{
										shrink: true,
									}}
									onChange={this.handleUpdatehange}
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
										name="editSavingsCategory"
										value= {this.state.editSavingsCategory}
										InputLabelProps={{
											shrink: true,
										}}
										onChange={this.handleUpdatehange}
										>
										{this.state.savings.map((item) => (
											<MenuItem key={item.id} value={item.savingsCategory}>
											{item.savingsCategory}
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
										name="editSavingsType"
										value= {this.state.editSavingsType}
										InputLabelProps={{
											shrink: true,
										}}
										onChange={this.handleUpdatehange}
										>
										{this.state.types.map((item) => (
											<MenuItem key={item.id} value={item.savingsType}>
											{item.savingsType}
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
										name="editSavingsName"
										value= {this.state.editSavingsName}
										variant="outlined"
										InputLabelProps={{
											shrink: true,
										}}
										onChange={this.handleUpdatehange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										id="outlined-number"
										required
										label="Amount"
										type="number"
										name="editSavingsAmount"
										value= {this.state.editSavingsAmount}
										variant="outlined"
										InputLabelProps={{
											shrink: true,
										}}
										onChange={this.handleUpdatehange}
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
										value= {this.state.editSavingsDescription}
										variant="outlined"
										name="editSavingsDescription"
										multiline
										rowsMax={4}
										InputLabelProps={{
											shrink: true,
										}}
										onChange={this.handleUpdatehange}
									/>
								</Grid>
							</Grid>
					</div>
				</form>
					</DialogContentText>
					</DialogContent>
					<DialogActions>
					<Button onClick={this.handleEditClickClose} color="primary">
						No Close
					</Button>
					<Button  onClick={(e) => this.handleUpdateSubmit(e,this.state.editid)} color="primary" autoFocus>
						Update
					</Button>
					</DialogActions>
				</Dialog>


			</div>
		)
	}
}

export default withStyles(styles)(Savings);