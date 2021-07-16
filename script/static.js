// 引入相应模块
const http = require('http')
const path = require('path')
const fs = require('fs')

const port = process.argv[2] || 8888
const root = path.resolve(__dirname, '../dist')

const types = {
  mp3: 'audio/mpeg',
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript'
}
const site = `http://localhost:${port}`

http
  .createServer((request, response) => {
    const { url } = request
    const filename = path.join(root, url)

    fs.exists(filename, (exists) => {
      if (!exists) {
        response.writeHead(404, { 'Content-Type': 'text/plain', 'X-my-param': 'zcyue' })
        response.write('404 Not Found\n')
        response.end()
        return
      }

      if (!fs.lstatSync(filename).isDirectory()) {
        let type = filename.split('.')
        type = type[type.length - 1]
        response.writeHead(200, { 'Content-Type': `${types[type]}; charset=utf-8` })
        fs.createReadStream(filename).pipe(response)
      } else {
        response.writeHead(301, { Location: `${site}/www/app.html` })
        response.end()
      }
    })
  })
  .listen(parseInt(port, 10))
