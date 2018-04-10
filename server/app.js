const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const views = require('koa-views')
const koaStatic = require('koa-static')
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body');
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('./../config')
const routers = require('./routers/index')

const app = new Koa()

// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
};

// 存放sessionId的cookie配置
const cookie = {
    maxAge: 10 * 60 * 1000, // cookie有效时长
    expires: '',  // cookie失效时间
    path: '/', // 写cookie所在的路径
    domain: 'localhost', // 写cookie所在的域名
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: false,  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
};

// 配置session中间件
app.use(convert(session({
    key: 'USER_SID',
    cookie: cookie,
    // store: new MysqlStore(sessionMysqlConfig)
})));

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件(可解析multipart/form-data)
app.use(koaBody({ multipart: true }));

// 配置ctx.body解析中间件
// app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, './../static')
));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

// 监听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);