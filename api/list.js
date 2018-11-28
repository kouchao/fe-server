const {list, visit} = require('../db');
const { randomStr } = require('../config.js');

function countAdd(type) {
	visit.create({
		type
	})
}
const getLinks = async (ctx) => {
	try {
		let {type, page, pageSize} = ctx.request.query
		countAdd(type)

		const data = await list.find({
			type
		})
		.sort({time: -1})
		.skip(page * pageSize || 0)
		.limit(pageSize * 1 || 30)

		const visited = await visit.count({
			type
		})

		const total = await list.count({
			type
		})

		ctx.body = {
			code: 0,
			data,
			visited,
			total
		}
	} catch (err) {
		console.log(err)
		ctx.body = {
			code: 1,
			err
		}
	}
}

const addLink = async (ctx) => {
	let {title, link, type, random, tag, time} = ctx.request.body

		try {

			if(randomStr != random){
				throw '随机串不匹配'
			}

			if(!type){
				throw '类型不能为空'
			}

			await list.create({
				title,
				type,
				link,
				tag,
				time: new Date(time)
			});

			ctx.body = {
				code: 0
			}
		} catch (err) {
			ctx.body = {
				code: 1,
				err
			}
		}


}


module.exports = {
	getLinks,
	addLink
}
