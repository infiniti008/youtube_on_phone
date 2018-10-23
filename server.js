var express = require('express');
var app = express()

app.use(express.static('gh-pages'))

app.listen(3000, () => {
    console.log('Run in 300 port')
})