import React from 'react'
import EtchView from './EtchView.js'

const SaveView = React.createClass({
	render: function(){
		return (
			<div id="saveContainer">
				<Header />
				<SaveForm />
			</div>
			)
	}
})

const SaveForm = React.createClass({
	
	_saveDrawing: function(e){
		var savedDrawing = new DrawingModel({
			
		})
	},

	render: function(){
		return (
			<form onSubmit={this._saveDrawing} >
			<input type="text" name="save" placeholder="name of drawing to save" />
			<button type="submit" value="save">Save</button>
			</form>
			)
	}
})




export default SaveView