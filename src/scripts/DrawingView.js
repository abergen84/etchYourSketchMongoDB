import React from 'react'
import Backbone from 'Backbone'

const DrawingView = React.createClass({
	
	getInitialState: function(){
		drawColl: this.props.drawColl
	},

	componentWillMount: function(){
		Backbone.Events.on('sync', ()=>{
			this.selfState({
				drawColl: this.state.drawColl
			})
		})
	},

	render: function(){
		return (
			<Header />
			<DrawingContainer drawColl={this.state.drawColl} />
			)
	}
})


const Header = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Saved Drawings</h1>
			</div>
			)
	}
})

const DrawingContainer = React.createClass({
	render: function(){
		return (
			
			)
	}
})




export default DrawingView