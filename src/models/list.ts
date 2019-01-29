import { mongoose } from "../config/database";
import {Schema } from 'mongoose';

let listSchema: Schema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	type: {
		type: Number,
		required: true
	},
	tag: {
		type: String,
	},
	time: {
		type: Date
	}
}, {
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	}
})

export const List = mongoose.model('list', listSchema)

