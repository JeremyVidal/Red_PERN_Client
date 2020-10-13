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
import Typography from '@material-ui/core/Typography';

interface AdminProps extends WithStyles<typeof styles>{
	clearToken: any;
	token: any,
}

interface AdminState {
	users: any[],

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


class Admin extends React.Component<AdminProps, AdminState> {
	constructor(props: AdminProps){
		super(props);
		this.state = {
			users: [],
		}
		this.deleteUser = this.deleteUser.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.getData = this.getData.bind(this);

	}

	deleteUser = (event:any, id:number) => {
		event.preventDefault();
		fetch(`http://localhost:4000/user/${id}`, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
			})
		})
		.then((res) => res.json())
		.then(() => {
			this.getData();
		})
	}

	updatePassword = () => {

	}
	getData =() => {
		fetch('http://localhost:4000/user/all', {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			this.setState({users: data })				  
		})
	}

	componentDidMount = () => {
		this.getData();
	}

	render(){
		const {classes} = this.props;
		return(
			<div className="wrapper">
				<h1>This is the Admin Portal!!!</h1>
				<Button onClick={this.props.clearToken}>Logout</Button>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TableContainer>
							<br />
							<Typography component="h1" variant="h5"><code>All Users</code></Typography>
							<Table className={classes.table} size="small" aria-label="a dense table">
								<TableHead>
									<TableRow>
										<TableCell>First Name</TableCell>
										<TableCell>Last Name</TableCell>
										<TableCell>Email</TableCell>
										<TableCell></TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
								{this.state.users.map((data, i) => (
								<TableRow key={i}>
									<TableCell>{data.firstName}</TableCell>
									<TableCell>{data.lastName}</TableCell>
									<TableCell>{data.email}</TableCell>
									<TableCell><Button onClick={(e) => this.deleteUser(e, data.id) } type="submit" variant="contained" color="primary" >Delete</Button></TableCell>
									<TableCell></TableCell>
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

export default withStyles(styles)(Admin);