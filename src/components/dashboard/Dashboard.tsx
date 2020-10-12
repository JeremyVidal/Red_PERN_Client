import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';


interface DashProps extends WithStyles<typeof styles> {
	userid: number,
	token: string,
}
interface DashState {
	user_id: any,
	checking: any[], 
	savings: any[], 
	
}

const styles = ({ palette, spacing}: Theme) => createStyles({
	table: {
	minWidth: 650,
	},
});

class Dashboard extends React.Component<DashProps, DashState> {
	constructor(props: DashProps){
		super(props);
		this.state = {
			user_id: 0, // ??????? how to set this to be defaulted to the incoming prop
			checking: [],
			savings: [],
		}
	}

	componentDidMount = () => {
		fetch('http://localhost:4000/checking', {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({user_id: this.props.userid})
			this.setState({checking: [ ...this.state.checking, ...data ]})			  
		})
		
		fetch('http://localhost:4000/savings', {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({savings: [ ...this.state.savings, ...data ]})			  
		})
	}
	
	render(){
		const {classes} = this.props;
		return(
			<div className="wrapper">
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<TableContainer>
							<br />
							<h2>Checking</h2>
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
									</TableRow>
									))}	
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={6}>
						<TableContainer>
							<br />
							<h2>Savings</h2>
							<Table size="small" aria-label="a dense table">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Time</TableCell>
										<TableCell>Category</TableCell>
										<TableCell>Type</TableCell>
										<TableCell>Name</TableCell>
										{/* <TableCell>Description</TableCell> */}
										<TableCell>Amount</TableCell>
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


export default withStyles(styles)(Dashboard);