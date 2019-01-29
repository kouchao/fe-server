import * as Koa from 'koa';
import * as cors from 'koa2-cors';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';

import { router } from './routes';

const app = new Koa();


app.use(cors())
app.use(logger())
app.use(bodyParser())

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3003);
