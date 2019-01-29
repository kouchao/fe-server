import * as mongoose from 'mongoose';
import {mongoHost, mongoPort, mongoDatabase} from './config';

mongoose.connect(`${mongoHost}:${mongoPort}/${mongoDatabase}`);


mongoose.connection.on('error', (err) => {
	console.log('connect error:', err)
})

mongoose.connection.once('open', () => {
	console.log('MongoDB is ready')
})

export { mongoose };