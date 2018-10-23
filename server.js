var express = require('express');
var app = express()

app.use(express.static('../youtube_on_phone'))

app.listen(3000, () => {
    console.log('Run in 300 port')
})