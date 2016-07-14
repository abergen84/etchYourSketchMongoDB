import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import {DrawingModel} from './models.js'

const EtchView = React.createClass({

	getInitialState: function(){
		return {
			canvas: 1024,
			selected: new Array(1024).fill(false)// make this an array of "false" 1024 times.
		} 
	},

	componentWillUnmount: function() {
		Backbone.Events.off('selectCanvas')
		Backbone.Events.off('fillBox')	
	},

	componentWillMount: function(){
		var self = this
		Backbone.Events.on('selectCanvas', function(value){
			var convertedToInt = parseInt(value)
			// console.log(convertedToInt)
			// console.log('new canvas input is a', typeof value)
			self.setState({
				canvas: convertedToInt,
				selected: new Array(convertedToInt).fill(false)
				//the new selected starts with the old selected
				//now take the difference between the larger canvas and smaller canvas
				//and concat an array of length equiv to the difference onto the end
			})
		})

		Backbone.Events.on('fillBox', function(i){
			// console.log(self.state.selected)
			self.setState({
				selected: self.state.selected.slice(0,i).concat([true]).concat(self.state.selected.slice(i+1))
			})
			// console.log(i)
			// console.log(self.state.selected.slice(0,i).concat([true]).concat(self.state.selected.slice(i+1)).length)
		})

		Backbone.Events.on('resetCanvas', function(value){
			// self.setState(self.getInitialState())
			var convertedToInt = parseInt(value)
			// console.log(convertedToInt)
			// console.log('reset canvas input is a', typeof value)
			self.setState({
				canvas: convertedToInt,
				selected: new Array(convertedToInt).fill(false)
			})
		})

		if (this.props.drawingFromDb) {
			this.props.drawingFromDb.on('sync', ()=>{
				var canvas = this.props.drawingFromDb.get('canvasSize')
				var selected = this.props.drawingFromDb.get('boxVals')
				self.setState({
					canvas: canvas,
					selected: selected
				})
			})
		}
		// console.log("setting the box:", this.state)
	},

	render: function(){
		// console.log("render top level", this)
		return (
			<div id="mainContainer">
				<Header />
				<EtchContainer boxVals={this.state.selected} canvas={this.state.canvas} />
				<div id="leftButton"></div>
				<div id="rightButton"></div>
				<SaveContainer boxVals={this.state.selected} canvas={this.state.canvas} />
			</div>
			)
	}
})


const Header = React.createClass({
	
	_handleCanvasSize: function(event){
		Backbone.Events.trigger('selectCanvas', event.target.value)

	},

	_resetCanvas: function(event){
		Backbone.Events.trigger('resetCanvas', this.refs.sizes.value)
	},

	render: function(){
		return (
			<header id="mainheader">
				<h1>etchYourSketch</h1>
				<div id="canvasSelector">
					<p>canvas size:</p>
					<select ref="sizes" onChange={this._handleCanvasSize} >
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
			my_array.push(<Square selected={this.props.boxVals[i]} myIndex={i} key={i} />)
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
		// console.log(this.props.myIndex)
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
		e.preventDefault()
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
			<div id="saveContainer">
				<form onSubmit={this._saveDrawing} >
					<input type="text" name="save" placeholder="name of drawing to save" />
					<button type="submit" value="save">Save</button>
				</form>
				<a href="#drawings/view">View saved drawings</a>
			</div>
			)
	}
})






export default EtchView