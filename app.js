//导入express模块
const express = require('express')
//导入https的模块
const https = require("https")
//导入fs模块
const fs = require('fs')

//创建express web服务实例
const app = express()

//配置证书
const httpsOption = {
    key : fs.readFileSync("./https/duruofu.xyz.key"),
    cert: fs.readFileSync("./https/duruofu.xyz_bundle.crt")
}

//创建https服务
const server = https.createServer(httpsOption, app)


//静态资源托管
app.use('/public', express.static('public'))

//配置中间件
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())
// 通过 express.urlencoded() 这个中间件，来解析 表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: false }))

//cors解决接口跨域的问题（一定要在路由之前，配置 cors 这个中间件）
const cors = require('cors')
app.use(cors())


// 导入路由模块
const router = require('./router/apiRouter')
// 挂载路由
app.use('/api', router)


// 错误级别中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)
})

//启动wed服务
server.listen(443,function(){
	console.log('express server runing at http://127.0.0.1:443');
})