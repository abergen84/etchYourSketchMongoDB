import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

const EtchView = React.createClass({
	
	getInitialState: function(){
		return {
			canvas: 512
		}
	},

	componentWillMount: function(){
		var self = this
		Backbone.Events.on('selectCanvas', function(e){
			self.setState({
				canvas: e
			})
		})
		// console.log("setting the box:", this.state)
	},

	render: function(){
		console.log("render top level", this)
		return (
			<div id="mainContainer">
				<Header />
				<EtchContainer canvas={this.state.canvas} />
			{/*<EtchContainer boxStatus={this.state.selected} />*/}
			</div>
			)
	}
})


const Header = React.createClass({
	
	_handleCanvasSize: function(e){
		console.log(e.target.value)
		Backbone.Events.trigger('selectCanvas', e.target.value)
		// this.setState({
		// 	canvas: e.target.value
		// })
		// console.log(this)
	},

	_resetCanvas: function(){
		Backbone.Events.trigger('resetCanvas')
	},

	render: function(){
		return (
			<header id="mainheader">
				<h1>etchYourSketch</h1>
				<div id="canvasSelector">
					<p>canvas size:</p>
					<select onChange={this._handleCanvasSize} >
						<option value="512">Small</option>
						<option value="1024">Medium</option>
						<option value="2056">Large</option>
					</select>
					<p id="resetbutton" onClick={this._resetCanvas}>Messed up?</p>
				</div>
				
			</header>
			)
	}
})

const EtchContainer = React.createClass({
	
	_populateBoxes: function(){
		var my_array = []
		for(var i = 0; i < this.props.canvas; i++){
			my_array.push(<Square />)
		}
		return my_array
	},	

	render: function(){
		console.log(this)
		return (
			<div id="etchContainer">
				{this._populateBoxes()}
			</div>
			)
	}
})

const Square = React.createClass({

	getInitialState: function(){
		return {
			selected: false
		}
	},

	componentWillMount: function(){
		var self = this
		Backbone.Events.on('resetCanvas', function(){
			self.setState({
				selected: false
			})
		})
	},
	
	_handleHover: function(){
		this.setState({
			selected: true
		})
	},

	render: function(){
		// console.log(this)
		var active = "box"
		if(this.state.selected){
			active = "box drawn"
		}
		return (
			<div className={active} onMouseOver={this._handleHover}>
			</div>
		)
	}
})








export default EtchView