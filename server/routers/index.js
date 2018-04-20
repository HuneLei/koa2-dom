/**
 *  整合所有子路由
 */

const router = require('koa-router')()

const home = require('./home');
const api = require('./api');
const admin = require('./admin');
const work = require('./work');
const error = require('./error');
const webapp = require('./weapp');

router.use('/', home.routes(), home.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/work', work.routes(), work.allowedMethods());
router.use('/error', error.routes(), error.allowedMethods());
router.use('/weapp', webapp.routes(), webapp.allowedMethods());

module.exports = router