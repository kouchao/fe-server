const Router = require('koa-router')();
const { list, message } = require('../api');
Router.get('/', async (ctx) => {
	try {

		ctx.body = {
			code: 1,
			msg: '接口已停用，请访问http://fe.jskou.com'
		}
	} catch (err) {
		ctx.body = err
	}
})
Router.get('/contents/list', list.getLinks)
Router.post('/contents/add', list.addLink)
Router.get('/message/list', message.list)
Router.post('/message/add', message.add)

module.exports = Router