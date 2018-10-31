const mongoose = require('mongoose');
const {mongoHost, mongoPort, mongoDatabase} = require('../config.js');

let mongoUrl = `${mongoHost}:${mongoPort}/${mongoDatabase}`
mongoose.connect(mongoUrl);

let db = mongoose.connection

db.on('error', (err) => {
	console.log('connect error:', err)
})

db.once('open', () => {
	console.log('MongoDB is ready')
})


const {Schema} = mongoose

let list = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	}
}, {
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	}
})

let visit = new Schema({
	event: {
		type: String,
		required: true
	}
}, {
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	}
})

list = mongoose.model('list', list)
visit = mongoose.model('visit', visit)

module.exports = {
	list,
	visit
}

