const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')
const UtilType = require('./type')
const UtilDatetime = require('./datetime')

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync(dirname) {
    // existsSync判断是否存在该文件夹
    if (fs.existsSync(dirname)) {
        return true
    } else {
        // 返回上层目录
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName(fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */
function uploadPicture(ctx, options) {
    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({ headers: req.headers })

    // 获取类型
    let pictureType = 'common'
    if (UtilType.isJSON(options) && UtilType.isString(options.pictureType)) {
        pictureType = options.pictureType
    }

    let picturePath = path.join(
        __dirname,
        '/../../static/upload/',
        // pictureType,
        // UtilDatetime.parseStampToFormat(null, 'YYYY-MM-DD')
    )

    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        let result = {
            success: false,
            code: '',
            message: '',
            data: null
        }

        const files = ctx.request.body.files

        for (let key in files) {
            const file = files[key];
            console.log(key)
            console.log('file', file)
            let pictureName = Math.random().toString(16).substr(2) + '.' + getSuffixName(file.name)
            let _uploadFilePath = path.join(picturePath, pictureName)
            console.log(_uploadFilePath)
            let saveTo = path.join(_uploadFilePath)
            const reader = fs.createReadStream(file.path);
            const writer = fs.createWriteStream(_uploadFilePath);
            reader.pipe(writer)
            result.success = true
            result.message = '文件上传成功'

            console.log('文件上传成功！')
            resolve(result)
        }


        // 解析请求文件事件
        // busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        //     console.log('File-file [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)

        //     let pictureName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
        //     let _uploadFilePath = path.join(picturePath, pictureName)
        //     console.log(_uploadFilePath)

        //     let saveTo = path.join(_uploadFilePath)

        //     console.log('saveTo', saveTo);
        //     console.log('file', file);

        //     // 文件保存到制定路径
        //     console.log(mkdirsSync(saveTo));
        //     fs.createReadStream('C:\/Users\/DELL\/Desktop\/蓝胖子.jpg').pipe(fs.createWriteStream('f:/\node_lib\/static\/output\/upload/\common/\2018-04-10\/6ff42ba80f782.jpg'))

        //     // file.on('data', function(data) {
        //     //   console.log('File-data [' + fieldname + '] got ' + data.length + ' bytes')
        //     // })

        //     fs.createReadStream('C:\/Users\/DELL\/Desktop\/蓝胖子.jpg').on('end', function () {
        //         console.log('File-end [' + fieldname + '] Finished')
        //         result.success = true

        //         console.log('文件上传成功！')
        //         resolve(result)
        //     })
        // })

        // // busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        // //   console.log('Field-field [' + fieldname + ']: value: ' + inspect(val))
        // // })
        // // busboy.on('finish', function() {
        // //   console.log('Done parsing form!')
        // // })

        // // 解析错误事件
        // busboy.on('error', function (err) {
        //     console.log('File-error')
        //     reject(result)
        // })

        // req.pipe(busboy)
    })
}

module.exports = {
    uploadPicture,
}