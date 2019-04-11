import {List, Visit} from '../models';
import axios from 'axios';
import { randomStr, dingding } from '../config/config.js';

// 添加访问数据
function countAdd(type) {
	Visit.create({
		type
	})
}

// 处理数据
function getList(msg, time, type) {
	let tag = ''
	msg = msg.replace(/\t+/g,'').replace(/\n\n+/g,'\n').split('\n')
			
	msg = msg.map(o => {
	tag = o.match(/\[(\S*)\]/)&&o.match(/\[(\S*)\]/)[1] || '';
		let arr = o.replace(`[${tag}]`,'').split('http')
		return arr[0] && arr[1] ? {
			title: arr[0],
			link: 'http' + arr[1],
			type,
			time,
			tag
		} : {
			title: '记录失败！请检查',
			link: '/',
			type,
			time,
			tag
		}
	}).filter(o => o)
	return msg
}


// 发送钉钉
function sendDingDing(lists){
	try {
		let md = {
			msgtype: 'markdown',
			markdown: {
				title: '每日早报',
				text: '### 每日早报 \n'
			},
			at: {
				isAtAll: false
			}
		}
		
		lists.forEach(o => {
			md.markdown.text += `- [${o.title}](${o.link}) \n`
		})
		md.markdown.text += '> [查看更多历史](http://fe.jskou.com) \n'

		dingding.forEach(token => {
			const url = `https://oapi.dingtalk.com/robot/send?access_token=${token}`
			console.log(url)

			axios.post(url, md).then((res) => {
				console.log(res.data)
			}).catch((err) => {
				console.log(err)
			})
		})
	
		
	}catch(err) {
		console.log('err')
		console.log(err)
	}

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
	let {msg, type, random, time} = ctx.request.body

		try {

			if(randomStr != random){
				throw '随机串不匹配'
			}

			if(!type){
				throw '类型不能为空'
			}

			const lists = getList(msg, time, type)
			sendDingDing(lists)
			await List.insertMany(lists)
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