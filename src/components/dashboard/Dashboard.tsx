import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import APIURL from "../../helpers/environment";


interface DashProps extends WithStyles<typeof styles> {
	token: string,
}
interface DashState {
	checking: any[], 
	savings: any[], 
	
}

const styles = ({ palette, spacing}: Theme) => createStyles({
	table: {
		minWidth: 650,
	},
	tablecontainer: {
		maxHeight: 500,
		overflowY: 'scroll',
	}
});

class Dashboard extends React.Component<DashProps, DashState> {
	constructor(props: DashProps){
		super(props);
		this.state = {
			checking: [],
			savings: [],
		}
	}

	componentDidMount = () => {
		window.scrollTo(0, 0)
		fetch(`${APIURL}/checking`, {
			method: "GET",
			headers: new Headers({
				"Authorization": this.props.token,
				"Content-Type": "application/json",
			}),
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({checking: [ ...this.state.checking, ...data ]})			  
		})
		
		fetch(`${APIURL}/savings`, {
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
						<h2>Checking</h2>
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
										<TableCell>${data.checkingAmount}</TableCell>
									</TableRow>
									))}	
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={6}>
						<h2>Savings</h2>
						<TableContainer className={classes.tablecontainer} >
							<br />
							<Table size="small" aria-label="a dense table">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Time</TableCell>
										<TableCell>Category</TableCell>
										<TableCell>Type</TableCell>
										<TableCell>Name</TableCell>
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