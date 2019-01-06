import React, { Component } from "react";
import "../../index.css";

export default class FormField extends Component {
	render() {
		return (
			<div>
				<label className="formLabel">{this.props.label}</label>
				<input name={this.props.elementName} type={this.props.type || "text"} className="formInput" label={this.props.label} onChange={this.props.handleChange} placeholder={this.props.placeholder}/>
			</div>
		)
	}
}