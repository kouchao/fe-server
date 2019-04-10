import * as mongoose from 'mongoose';
import {mongoHost, mongoPort, mongoDatabase, mongoUsername, mongoPassword} from './config';
const url = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`
mongoose.connect(url, {
	useNewUrlParser: true,
	auth: {
		authSource: 'admin',
		user: mongoUsername,
		password: mongoPassword
	}
	
});

mongoose.connection.on('error', (err) => {
	console.log('connect error:', err)
})

mongoose.connection.once('open', () => {
	console.log('MongoDB is ready')
})

export { mongoose };