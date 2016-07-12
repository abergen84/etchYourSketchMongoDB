import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import EtchView from './EtchView.js'
import {DrawingCollection} from './models.js'
import DrawingView from './DrawingView.js'

const app = function() {

var DrawingRouter = Backbone.Router.extend({
	routes: {
		// "drawings/save": "saveDrawing",
		"drawings/view": "viewDrawing",
		"home": "goHome",
		"*catchall": "routeHome"
	},

	initialize: function(){
		Backbone.history.start()
	},

	routeHome: function(){
		location.hash = "home"
	},

	goHome: function(){
		ReactDOM.render(<EtchView />,document.querySelector('.container'))
	},

	viewDrawing: function(){
		var drawColl = new DrawingCollection()
		drawColl.fetch()
		ReactDOM.render(<DrawingView drawColl={drawColl} />, document.querySelector('.container'))
	}

	// saveDrawing: function(){
	// 	ReactDOM.render(<EtchView />, document.querySelector('.container'))
	// }



})

new DrawingRouter()

}

app()