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
		localStorage.setItem("admin", 'newAdmin');
		this.setState({admin: newAdmin});
	}

	clearToken = () => {
		localStorage.clear();
		this.setState({sessionToken: ''});
		this.setState({admin: false});
	}

	// componentDidMount = () => {
	// 	if (localStorage.getItem('admin')){
	// 		this.setState({admin: localStorage.getItem('admin')}) 
	// 	}
	// 	else if (localStorage.getItem('token')){
	// 		this.setState({sessionToken: localStorage.getItem('token')}) 
	// 	}
	// }

	protectedViews = () => {
		return this.state.admin ? (<Admin clearToken={this.clearToken}/>) 
		: this.state.sessionToken ? (<NavBar admin={this.state.admin} token={this.state.sessionToken} clearToken={this.clearToken}/>) 
		: (<Auth updateToken={this.updateToken} clearToken={this.clearToken}/>);
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
