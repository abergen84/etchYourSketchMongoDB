import React from 'react'
import Backbone from 'Backbone'

const DrawingView = React.createClass({
	
	getInitialState: function(){
		return {
			drawColl: this.props.drawColl
		}
	},

	componentWillMount: function(){
		this.state.drawColl.on('sync', ()=>{
			this.setState({
				drawColl: this.state.drawColl
			})
		})
	},

	render: function(){
		return (
			<div id="drawingView">
				<Header />
				<DrawingContainer drawColl={this.state.drawColl} />
				<Footer />
			</div>
			)
	}
})


const Header = React.createClass({
	render: function(){
		return (
			<div id="savedHeader">
				<h1>etchYourSketch</h1>
				<h3>Saved Drawings</h3>
			</div>
			)
	}
})

const DrawingContainer = React.createClass({
	render: function(){
		console.log(this)
		return (
			<div id="drawingContainer">
				{this.props.drawColl.map(function(model){
					return <Drawing model={model} key={model.cid} />
					}
				)}
			</div>
			)
	}
})

const Drawing = React.createClass({
	
	_handleClick: function(){
		location.hash = `drawings/${this.props.model.get('_id')}`
	},

	render: function(){
		console.log(this)
		return (
			<div className="drawing">
				<h1 onClick={this._handleClick} >{this.props.model.get('title')}</h1>
			</div>
			)
	}
})

const Footer = React.createClass({
	render: function(){
		return (
			<footer>
				<a href="#draw">back home</a>
			</footer>
			)
	}
})



export default DrawingView