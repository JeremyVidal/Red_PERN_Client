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
import APIURL from "../../helpers/environment";

interface CheckingProps extends WithStyles<typeof styles>{
	token: string,
}

interface CheckingState {
	editid: number,
	editData: any[],
	editopen: boolean,
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
	editCheckingDate: any,
	editCheckingTime: any,
	editCheckingCategory: string,
	editCheckingType: string,
	editCheckingName: string,
	editCheckingDescription: string,
	editCheckingAmount: number,
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


class Checking extends React.Component<CheckingProps, CheckingState> {
	constructor(props: CheckingProps){
		super(props);
		this.state = {
			editid: 0,
			editData: [],
			editopen: false,
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
			editCheckingDate: null,
			editCheckingTime: null,
			editCheckingCategory: '',
			editCheckingType: '',
			editCheckingName: '',
			editCheckingDescription: '',
			editCheckingAmount: 0,
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
		fetch(`${APIURL}/checking/update/${id}`, {
			method: "PUT",
			body: JSON.stringify({						
				checkingDate: this.state.editCheckingDate,
				checkingTime: this.state.editCheckingTime,
				checkingCategory: this.state.editCheckingCategory,
				checkingType: this.state.editCheckingType,
				checkingName: this.state.editCheckingName,
				checkingDescription: this.state.editCheckingDescription,
				checkingAmount: this.state.editCheckingAmount,
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
		fetch(`${APIURL}/checking/${id}`, {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({editCheckingDate: data.checkingDate})	
			this.setState({editCheckingTime: data.checkingTime})	
			this.setState({editCheckingCategory: data.checkingCategory})	
			this.setState({editCheckingType: data.checkingType})	
			this.setState({editCheckingName: data.checkingName})	
			this.setState({editCheckingDescription: data.checkingDescription})	
			this.setState({editCheckingAmount: data.checkingAmount})	
			// console.log(data)	  
		})
	}

	handleEditUpdate =(id:number) => {
		fetch(`${APIURL}/checking/update/${id}`, {
			method: "PUT",
			body: JSON.stringify({		
				checkingDate: this.state.editCheckingDate,
				checkingTime: this.state.editCheckingTime,
				checkingCategory: this.state.editCheckingCategory,
				checkingType: this.state.editCheckingType,
				checkingName: this.state.editCheckingName,
				checkingDescription: this.state.editCheckingDescription,
				checkingAmount: this.state.editCheckingAmount,
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
			let url = `${APIURL}/checking/${id}`;
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

	handleUpdatehange = (event : any) => {
		event.preventDefault();
		const { name, value } = event.target;
		this.setState(Object.assign(this.state, {[name]: value}));
	}

	handleSubmit = (event:any) => {
		event.preventDefault();
		fetch(`${APIURL}/checking/create`, {
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
				this.getData(this.props.token);
			})
	}
	componentDidMount = () => {
		window.scrollTo(0, 0)
		this.getData(this.props.token);
	}
	getData = (token: any) => {
		fetch(`${APIURL}/checkingCategories/`, {
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
		fetch(`${APIURL}/checkingTypes/`, {
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
		fetch(`${APIURL}/checking`, {
			method: "GET",
			headers: new Headers({
				"Authorization": token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({checking: data})			  
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
						<FormControl>
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
										<Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary" >Add</Button>
								</Grid>
							</Grid>
						</FormControl>
					</div>
				</form>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography component="h1" variant="h5">Checking Transactions</Typography>
						<TableContainer className={classes.tablecontainer} >
							<br />
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
					<DialogTitle id="alert-dialog-title">{"Checking transaction update!"}</DialogTitle>
					<DialogContent>
					<DialogContentText id="alert-dialog-description">
						
					<form className={classes.root} autoComplete="off">
      				<div>
					<Typography component="h1" variant="h5">Update Checking Transaction</Typography>

						<FormControl>
							<Grid container spacing={3}>
							<Grid item xs={6}>
								<TextField
									id="standard-required"
									required
									label="Date"
									name="editCheckingDate"
									value= {this.state.editCheckingDate}
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
									name="editCheckingTime"
									value= {this.state.editCheckingTime}
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
										name="editCheckingCategory"
										value= {this.state.editCheckingCategory}
										InputLabelProps={{
											shrink: true,
										}}
										onChange={this.handleUpdatehange}
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
										name="editCheckingType"
										value= {this.state.editCheckingType}
										InputLabelProps={{
											shrink: true,
										}}
										onChange={this.handleUpdatehange}
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
										name="editCheckingName"
										value= {this.state.editCheckingName}
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
										name="editCheckingAmount"
										value= {this.state.editCheckingAmount}
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
										value= {this.state.editCheckingDescription}
										variant="outlined"
										name="editCheckingDescription"
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

export default withStyles(styles)(Checking);