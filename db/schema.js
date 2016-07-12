const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // REQUIRED FOR AUTHENTICATION: Do Not Touch
    email: String,
    password: String,
})

const drawingSchema = new Schema({
	title: String,
	canvasSize: Number,
	boxVals: Array
})

module.exports = {
  User: createModel('User', usersSchema),
  Drawing: createModel('Drawing', drawingSchema)
}
