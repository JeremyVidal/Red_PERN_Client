import React from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Admin from './components/admin/Admin';
import NavBar from './components/site/NavBar';

interface AppProps {

}

interface AppState {
	sessionToken: string,
	admin: boolean,
}

class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps){
		super(props);
		this.state = {
			sessionToken: '',
			admin: false,
		}
		this.updateToken = this.updateToken.bind(this);
		this.clearToken = this.clearToken.bind(this);
		this.protectedViews = this.protectedViews.bind(this);

	}

	updateToken = (newToken:string, newAdmin:boolean) => {
		localStorage.setItem("token", newToken);
		this.setState({sessionToken: newToken});
		localStorage.setItem("admin", JSON.stringify(newAdmin));
		this.setState({admin: newAdmin});
	}

	clearToken = () => {
		localStorage.clear();
		this.setState({sessionToken: ''});
		this.setState({admin: false});
	}

	componentDidMount = () => {
		let token: string | null = localStorage.getItem('token');
		if (localStorage.getItem('admin')){
			let isAdmin: boolean;
			if (localStorage.getItem('admin') === 'true'){
				isAdmin = true;
			}
			else {
				isAdmin = false;
			}
			this.setState({admin: isAdmin}) 
		}
		if (token){
			this.setState({sessionToken: token}) 
		}
	}

	protectedViews = () => {
		// return this.state.admin ? (<Admin clearToken={this.clearToken}/>) 
		// : this.state.sessionToken  ? (<NavBar admin={this.state.admin} token={this.state.sessionToken} clearToken={this.clearToken}/>) 
		// : (<Auth updateToken={this.updateToken} clearToken={this.clearToken}/>);

		if(this.state.admin ){
			console.log(`Admin: ${this.state.admin}`)
			return (<Admin clearToken={this.clearToken}/>) 
		}
		else if(this.state.sessionToken) {
			console.log(`NavBar: ${this.state.sessionToken}`)
			return (<NavBar admin={this.state.admin} token={this.state.sessionToken} clearToken={this.clearToken}/>) 
		}
		else{
			console.log(`Auth: ${this.state.sessionToken}`)
			return (<Auth updateToken={this.updateToken} clearToken={this.clearToken}/>)
		}

	};

	render(){
		return(
			<div>
				{this.protectedViews()}
			</div>
		)
	}
}
export default App;
