const {list, visit} = require('../db');

function countAdd() {
	visit.create({
		event: 'getList'
	})
}
const getLinks = async (ctx) => {
	try {
		countAdd()

		let data = await list.find().sort({_id: -1})
		let count = await visit.count()

		ctx.body = {
			code: 0,
			data,
			count
		}
	} catch (err) {
		ctx.body = err
	}
}

const addLink = async (ctx) => {
	let {title, link} = ctx.request.body

	try {
		await list.create({
			title,
			link
		});

		ctx.body = {
			code: 0
		}
	} catch (err) {
		ctx.body = err
	}
}


module.exports = {
	getLinks,
	addLink
}
