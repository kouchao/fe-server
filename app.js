const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const router = require('./router');

const app = new Koa();


app.use(cors())
app.use(logger())
app.use(bodyParser())

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3003);
