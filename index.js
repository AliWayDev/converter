const fs = require('fs')
const express = require('express')
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const createFile = (data) => {
    let buff = Buffer.from(data.base64, 'base64');
    fs.writeFileSync(__dirname + '/public/image.png', buff);
}

io.on('connection', socket => {
    socket.on('base64', data => {
        if (data.base64) {
            createFile(data)
            socket.emit('base64', { reload: true })
        }
    })
})

http.listen(3005, () => console.log(`server: ${3005}`))