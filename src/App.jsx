import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Admin from './components/admin/Admin';
import NavBar from './components/site/NavBar';
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
	const [sessionToken, setSessionToken] = useState("");
	const [admin, setAdmin] = useState(false);
	const [userid, setUserid] = useState('');

	useEffect(() => {
		if (localStorage.getItem("token")) {
		  setSessionToken(localStorage.getItem("token"));
		}
	  }, []);
	const updateToken = (newToken, newAdmin, newUserid) => {
		localStorage.setItem("token", newToken);
		setSessionToken(newToken);
		localStorage.setItem("admin", newAdmin);
		setAdmin(newAdmin);
		localStorage.setItem("userid", newUserid);
		setUserid(newUserid);
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
		else if (admin === false && sessionToken === localStorage.getItem("token")){
			return <NavBar token={sessionToken} userid={userid} clearToken={clearToken}/>
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
