import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import EtchView from './EtchView.js'
import {DrawingCollection} from './models.js'
import {DrawingModel} from './models.js'
import DrawingView from './DrawingView.js'

const app = function() {

var DrawingRouter = Backbone.Router.extend({
	routes: {
		"drawings/view": "viewDrawings",
		"drawings/:id": "viewSingleDrawing",
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

	viewDrawings: function(){
		var drawColl = new DrawingCollection()
		drawColl.fetch()
		ReactDOM.render(<DrawingView drawColl={drawColl} />, document.querySelector('.container'))
	},

	viewSingleDrawing: function(id) {
		// make a request to /api/drawings/ID
		// pass that model down to an EtchView
		var drawSavedMod = new DrawingModel()
		drawSavedMod.fetch({
			url: "/api/drawing/" + id
		}).then(function(apiResponse){
			console.log(apiResponse)
		})
		ReactDOM.render(<EtchView drawingFromDb={drawSavedMod} />,document.querySelector('.container'))
	}



})

new DrawingRouter()

}

app()