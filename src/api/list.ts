import {List, Visit} from '../models';
const { randomStr } = require('../config/config.js');

function countAdd(type) {
	Visit.create({
		type
	})
}

export const getLinks = async (ctx) => {
	try {
		let {type, page, pageSize} = ctx.request.query
		countAdd(type)

		const data = await List.find({
			type
		})
		.sort({time: -1})
		.skip(page * pageSize || 0)
		.limit(pageSize * 1 || 30)

		const visited = await Visit.count({
			type
		})

		const total = await List.count({
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

export const addLink = async (ctx) => {
	let {title, link, type, random, tag, time} = ctx.request.body

		try {

			if(randomStr != random){
				throw '随机串不匹配'
			}

			if(!type){
				throw '类型不能为空'
			}

			await List.create({
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