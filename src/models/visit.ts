import { mongoose } from "../config/database";
import {Schema } from 'mongoose';

const visitSchema: Schema = new Schema({
	type: {
		type: Number,
		required: true
	}
}, {
	timestamps: {
		createdAt: 'created',
		updatedAt: 'updated'
	}
})

export const Visit = mongoose.model('visit', visitSchema)

