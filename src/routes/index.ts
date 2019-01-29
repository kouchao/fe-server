import * as Router from 'koa-router';
import {list} from '../api';

const router = new Router();

router.get('/contents/list', list.getLinks)
router.post('/contents/add', list.addLink)

export { router };