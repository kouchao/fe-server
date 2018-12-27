const {message} = require('../db');

const list = async (ctx) => {
	try {
		let {page, pageSize} = ctx.request.query

		const data = await message.find({},{name: 1, content: 1})
		.sort({created: -1})
		.skip(page * pageSize || 0)
		.limit(pageSize * 1 || 30)

		const total = await message.count({})

		ctx.body = {
			code: 0,
			data,
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

const add = async (ctx) => {
	let {name, content, email} = ctx.request.body

		try {
			if(!name){
				throw '昵称不能为空'
			}

			if(!content){
				throw '留言不能为空'
			}

			if(!email){
				throw '邮箱不能为空'
			}

			await message.create({
				name,
				content,
				email
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
	list,
	add
}