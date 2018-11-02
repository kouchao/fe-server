const {list, visit} = require('../db');
const { randomStr } = require('../config.js');

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
	let {title, link, random} = ctx.request.body

	if(randomStr == random){
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
	} else {
		ctx.body = {
			code: 1,
			msg: '随机串不匹配'
		}
	}

}


module.exports = {
	getLinks,
	addLink
}
