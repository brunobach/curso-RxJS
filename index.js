const path = require('path')
const app = require('./most-used-words')

const src = path.join(__dirname, 'legendas')

app.initRead(src)