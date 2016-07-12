import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

const EtchView = React.createClass({

	getInitialState: function(){
		return {
			canvas: 1024,
			selected: new Array(1024).fill(false)// make this an array of "false" 1024 times.
		}
	},

	componentWillMount: function(){
		var self = this
		Backbone.Events.on('selectCanvas', function(e){
			self.setState({
				canvas: e
			})
		})

		Backbone.Events.on('fillBox', function(i){
			self.setState({
				selected: self.state.selected.slice(0,i).concat([true]).concat(self.state.selected.slice(i+1))
			})
		})

		Backbone.Events.on('resetCanvas', function(){
			// self.setState(self.getInitialState())
			self.setState({
				selected: new Array(1024).fill(false)
			})
		})
		// console.log("setting the box:", this.state)
	},

	render: function(){
		// console.log("render top level", this)
		return (
			<div id="mainContainer">
				<Header />
				<EtchContainer boxVals={this.state.selected} canvas={this.state.canvas} />
			{/*<EtchContainer boxStatus={this.state.selected} />*/}
				<div id="leftButton"></div>
				<div id="rightButton"></div>
				<SaveContainer boxVals={this.state.selected} canvas={this.state.canvas} />
			</div>
			)
	}
})


const Header = React.createClass({
	
	_handleCanvasSize: function(e){
		Backbone.Events.trigger('selectCanvas', e.target.value)

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
						<option value="1024">Small</option>
						<option value="1600">Medium</option>
						<option value="2056">Large</option>
					</select>
					<button id="resetbutton" onClick={this._resetCanvas}>Messed up?</button>
				</div>
				
			</header>
			)
	}
})

const EtchContainer = React.createClass({
	
	_populateBoxes: function(){
		var my_array = []
		for(var i = 0; i < this.props.canvas; i++){
			my_array.push(<Square selected={this.props.boxVals[i]} myIndex={i} />)
		}
		return my_array
	},	

	render: function(){
		// console.log(this)
		return (
			<div id="etchContainer">
				{this._populateBoxes()}
			</div>
			)
	}
})

const Square = React.createClass({

	// getInitialState: function(){
	// 	return {
	// 		selected: false
	// 	}
	// },

	// componentWillMount: function(){
	// 	var self = this
	// 	Backbone.Events.on('resetCanvas', function(){
	// 		self.setState(self.getInitialState())
	// 	})
	// },
	
	_handleHover: function(){
		// this.setState({
		// 	selected: true
		// })
		Backbone.Events.trigger('fillBox',this.props.myIndex)
	},

	render: function(){
		// console.log(this)
		var active = "box"
		if(this.props.selected){
			active = "box drawn"
		}
		return (
			<div className={active} onMouseEnter={this._handleHover}>
			</div>
		)
	}
})

const SaveContainer = React.createClass({

	_saveDrawing: function(e){
		var savedDrawing = new DrawingModel({
			title: e.target.save.value,
			canvasSize: this.props.canvas,
			boxVals: this.props.boxVals
		})
		savedDrawing.save()
	},

	render: function(){
		// console.log(this)
		return (
			<form onSubmit={this._saveDrawing} >
			<input type="text" name="save" placeholder="name of drawing to save" />
			<button type="submit" value="save">Save</button>
			</form>
			)
	}
})






export default EtchView