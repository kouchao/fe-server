const {list, visit} = require('../db');
const { randomStr } = require('../config.js');

function countAdd(type) {
	visit.create({
		type
	})
}
const getLinks = async (ctx) => {
	try {
		let {type} = ctx.request.query
		countAdd(type)

		let data = await list.find({
			type
		}).sort({_id: -1})

		let count = await visit.count({
			type
		})

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
	let {title, link, type, random, tag} = ctx.request.body

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
				tag
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
