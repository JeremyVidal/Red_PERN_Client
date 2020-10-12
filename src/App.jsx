import React, { useState } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Admin from './components/admin/Admin';
import NavBar from './components/site/NavBar';
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
	const [sessionToken, setSessionToken] = useState('');
	const [admin, setAdmin] = useState();
	const [userid, setUserid] = useState();

	const updateToken = (newToken, newAdmin, newUserid) => {
		// localStorage.setItem("token", newToken);
		setSessionToken(newToken);
		// localStorage.setItem("admin", newAdmin);
		setAdmin(newAdmin);
		// localStorage.setItem("userid", newUserid);
		setUserid(newUserid);
	};
	const clearToken = () => {
		// localStorage.clear();
		setSessionToken("");
		setAdmin(false);
		setUserid('');
	};

	const protectedViews = () => {
		return admin ? (<Admin clearToken={clearToken}/>) 
		: sessionToken !== '' ? (<NavBar admin={admin} token={sessionToken} userid={userid} clearToken={clearToken}/>) 
		: (<Auth updateToken={updateToken} clearToken={clearToken}/>);
	};

	  
	return(
		<div>
			{protectedViews()}
		</div>
	)
}

export default App;
