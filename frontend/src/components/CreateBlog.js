import React, {Component} from "react";
import TextField from "./child/TextField";
import {connect} from "react-redux";
import { EditorState } from 'draft-js';
import ImageUploader from 'react-images-upload';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
				
const mapStateToProps = (state) => {
	return {token : state.currentUser.token}
}

class CreateBlog extends Component {

	constructor(){
		super();
		this.state={
			event : {},
			pictures : [],
			editorState: EditorState.createEmpty(),
		}
		this.handleChange = this.handleChange.bind(this);
		this.submitCreateBlog = this.submitCreateBlog.bind(this);
		this.onDrop = this.onDrop.bind(this);
		//this.uploadImageToServer = this.uploadImageToServer.bind(this);
	}
	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.id;
		let event = {...this.state.event};
		event[name] = value;
		this.setState({event});
	}

	submitCreateBlog(event){
		event.preventDefault();
		console.log('event object ' + JSON.stringify(this.state.event));
		const formData = new FormData();
		formData.append('file',this.state.pictures[0]);
		formData.append('event', JSON.stringify(this.state.event));
		//formData.append('event', JSON.stringify({"id":"5"}));
		fetch('http://localhost:8080/blogs', {
			method: 'POST',
			mode: "cors",
			headers: {
				//'Accept': 'form',
				//'Content-Type': 'multipart/form-data',
				'Bearer' : this.props.token
			},
			body: formData,
		})
		.then((res) => {

				
			console.log("Successfully Created!!!" + JSON.stringify(res))
			
		})
		.catch(() => console.log("Sorry Better Luck Next Time!!!"));
		console.log(this.props.history);
		this.props.history.push('/events');
	}

	onDrop(picture) {
			console.log(picture);
			this.setState({
				pictures: this.state.pictures.concat(picture),
			});
	 }

	 onEditorStateChange = (editorState) => {
		this.setState({
		  editorState,
		});
	  };	

	render() {
		return (
			<div>
				<TextField row="2" column="60" id="title" handleChange={this.handleChange} label="Title"/>
				<TextField row="10" column="60" id ="body" handleChange={this.handleChange} label="Body"/>
				<Editor
					editorState={this.state.editorState}
					onEditorStateChange={this.onEditorStateChange}
				/>
				<ImageUploader
                	withIcon={true}
                	buttonText='Choose images'
                	onChange={this.onDrop}
                	imgExtension={['.jpg', '.gif', '.png', '.gif']}
					maxFileSize={5242880}
					withPreview={true}
            	/>
				<button name="Submit" onClick={this.submitCreateBlog}>Submit</button>
			</div>
		);
	}
}

export default connect(mapStateToProps,null)(CreateBlog);