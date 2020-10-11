import React from 'react';

interface SettingsProps {
	userid: number,
	token: string,
}

class Settings extends React.Component<SettingsProps> {
	constructor(props: SettingsProps){
		super(props);
		this.state = {

		}
	}
	render(){
		return(
			<div>
				<h1>This is the Settings Portal!!!</h1>
			</div>
		)
	}
}

export default Settings;