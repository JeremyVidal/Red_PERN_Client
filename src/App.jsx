import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Admin from './components/admin/Admin';
import Dashboard from './components/dashboard/Dashboard';
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
	const [sessionToken, setSessionToken] = useState("");
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("token")) {
		  setSessionToken(localStorage.getItem("token"));
		}
	  }, []);
	const updateToken = (newToken, newAdmin) => {
		localStorage.setItem("token", newToken);
		setSessionToken(newToken);
		localStorage.setItem("admin", newAdmin);
		setAdmin(newAdmin);
		// console.log(sessionToken);
	};
	const clearToken = () => {
		localStorage.clear();
		setSessionToken("");
		setAdmin(false);
	};

	const protectedViews = () => {
		if (admin === true){
			return <Admin clearToken={clearToken}/>
		}
		else if (sessionToken === localStorage.getItem("token")){
			return <Dashboard clearToken={clearToken}/>
		}
		else {
			return <Auth updateToken={updateToken} clearToken={clearToken}/>
		}
	}
	  
	return(
		<div>
			{protectedViews()}
		</div>
	)
}

export default App;
