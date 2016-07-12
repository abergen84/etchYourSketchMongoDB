import Backbone from 'backbone'


export const DrawingModel = Backbone.Model.extend({
	url: "/api/drawing"
})

export const DrawingCollection = Backbone.Collection.extend({
	model: DrawingModel,
	url: "/api/drawing"
})
