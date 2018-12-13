const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req, res)=>{
    res.send({
        message:'Home'
    })
})

app.get('/loadMoreContents',(req, res)=> {

    var colors = [
        '#4CAF50',
        '#FFC107',
        '#2196F3',
        '#FF5252',
        '#3949AB',
        '#00BCD4',
        '#28a745',
        '#424242',
        '#1976D2'
    ]

    var responseData = []

    var i =0

    function dataFiles(imgUrl, imgLazyUrl) {
        this.imgUrl = imgUrl,
        this.name = 'Image' + Math.floor((Math.random() * 100) + 1),
        this.imgLazyUrl = imgLazyUrl,
        this.id = Math.floor((Math.random() * 100000000) + 1),
        this.type = 'files',
        this.color = colors[Math.floor((Math.random() * 8) + 1)]
    }

    for(i=0; i<60; i++) {

        var n = Math.floor((Math.random() * 17) + 1)

        var imgUrl = `https://picsum.photos/500/300?image=${n * 5 + 10}`
        var imgLazyUrl = `https://picsum.photos/10/6?image=${n * 5 + 10}`

        var items = new dataFiles(imgUrl, imgLazyUrl)

        responseData.push(items)
    }

    setTimeout(function () {
        res.send({
            contents: responseData
        })
    }, 1000);
})

app.get('/getContents',(req, res)=> {

    var colors = [
        '#4CAF50',
        '#FFC107',
        '#2196F3',
        '#FF5252',
        '#3949AB',
        '#00BCD4',
        '#28a745',
        '#424242',
        '#1976D2'
    ]

    var responseData = []

    var types = [
        'quick',
        'files',
        'folders'
    ]

    var i =0

    function dataFiles(imgUrl, imgLazyUrl) {
        this.imgUrl = imgUrl,
        this.name = 'Image',
        this.imgLazyUrl = imgLazyUrl,
        this.id = Math.floor((Math.random() * 100000000) + 1),
        this.type = types[Math.floor((Math.random() * 3) + 0)],
        this.color = colors[Math.floor((Math.random() * 8) + 1)]
    }

    for(i=0; i<70; i++) {

        var n = Math.floor((Math.random() * 17) + 1)

        var imgUrl = `https://picsum.photos/500/300?image=${n * 5 + 10}`
        var imgLazyUrl = `https://picsum.photos/10/6?image=${n * 5 + 10}`

        var items = new dataFiles(imgUrl, imgLazyUrl)

        responseData.push(items)
    }

    res.send({
        contents: responseData
    })

})

app.listen(3344, () => console.log("Running on locahost:3344"));
