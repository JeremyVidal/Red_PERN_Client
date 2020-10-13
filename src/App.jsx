import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Admin from './components/admin/Admin';
import NavBar from './components/site/NavBar';
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
	const [sessionToken, setSessionToken] = useState('');
	const [admin, setAdmin] = useState(false);

	const updateToken = (newToken, newAdmin) => {
		localStorage.setItem("token", newToken);
		setSessionToken(newToken);
		localStorage.setItem("admin", newAdmin);
		setAdmin(newAdmin);
	};
	const clearToken = () => {
		localStorage.clear();
		setSessionToken("");
		setAdmin(false);
	};

	useEffect(() => {

		if (localStorage.getItem('token')){
			setSessionToken(localStorage.getItem('token')) 
		}
		// if (localStorage.getItem('admin')){
		// 	setAdmin(localStorage.getItem('admin')) 
		// }
	  }, []);
	
	const protectedViews = () => {
		return admin ? (<Admin clearToken={clearToken}/>) 
		: sessionToken ? (<NavBar admin={admin} token={sessionToken} clearToken={clearToken}/>) 
		: (<Auth updateToken={updateToken} clearToken={clearToken}/>);
	};

	  
	return(
		<div>
			{protectedViews()}
		</div>
	)
}

export default App;
