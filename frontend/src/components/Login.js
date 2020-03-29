import React from "react";
import FormField from './child/FormField'

import {currentUser} from "../actions";
import {connect} from "react-redux";
import {hostname} from "../constants/properties"
import "../css/index.css"

const mapDispatchToProps = dispatch => {
	return {
		currentUser: user => dispatch(currentUser(user))
	};
};

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.currentUser
	}
};

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};

		this.register = this.register.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async register(event) {
		event.preventDefault();
		fetch('http://'+hostname+':8080/auth/login', {
			method: 'POST',
			mode: "cors",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state.user)
		}).then(res => res.json())
			.then(json => {
				console.log("Successfully logged in");
				this.props.currentUser(json);
				sessionStorage.setItem('currentUser', JSON.stringify(json))
				this.props.history.push('/');
			});
	}


	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		let user = {...this.state.user};
		user[name] = value;
		this.setState({user});
	}

	render() {
		return (
			<div className={(this.props.loggedInUser !== undefined) ? "hide" : "login container"}>
				<form onSubmit={this.register} method="POST">
					<FormField elementName="userName" label="User Name :" placeholder="Enter User Name"
							   handleChange={this.handleChange}/>
					<FormField elementName="password" label="Password :" placeholder="Password"
							   handleChange={this.handleChange} type={"password"}/>
					<div>
						<button className="login button" type="submit">Login</button>
					</div>
				</form>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)