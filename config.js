const config = {

    port: 9090,
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx9a26d73bc4e6f87f',

    // 微信小程序 App Secret
    appSecret: '961a031cfec1c4a6e70c1facf304a0be',

    // MySQL 配置，用来存储 session 和用户信息
    database: {
        HOST: 'localhost',
        USERNAME: 'root',
        PASSWORD: '123456',   // 本地环境密码
        // PASSWORD: 'wx9a26d73bc4e6f87f',     // 测试环境密码
        // PASSWORD: 'hautXtxH',            // 生产环境密码
        DATABASE: 'poem_problems',
        PORT: '3306',
    }
}

module.exports = config