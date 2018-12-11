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

app.get('/getContents',(req, res)=> {

    var colors = [
        '#4CAF50',
        '#FFC107',
        '#2196F3',
        '#FF5252',
        '#3949AB',
        'teal',
        '#00BCD4',
        '#28a745',
        '#424242',
        '#1976D2'
    ]

    var i =0
    var responseData = {
        'quick' : [],
        'files': [],
        'folders': []
    }

    function dataFiles(imgUrl, imgLazyUrl) {
        this.imgUrl = imgUrl,
        this.name = 'Image' + Math.floor((Math.random() * 100) + 1),
        this.imgLazyUrl = imgLazyUrl,
        this.id = Math.floor((Math.random() * 100000000) + 1)
    }

    function dataFolders(imgUrl, imgLazyUrl) {
        this.name = 'Ranee',
        this.color = colors[Math.floor((Math.random() * 8) + 1)],
        this.id = Math.floor((Math.random() * 100000000) + 1)
    }

    for(i=0; i<10; i++) {

        var n = Math.floor((Math.random() * 17) + 1)

        var imgUrl = `https://picsum.photos/500/300?image=${n * 5 + 10}`
        var imgLazyUrl = `https://picsum.photos/10/6?image=${n * 5 + 10}`

        var items = new dataFiles(imgUrl, imgLazyUrl)

        responseData['quick'].push(items)
    }

    i = 0

    for(i=0; i<40; i++) {

        var n = Math.floor((Math.random() * 17) + 1)

        var imgUrl = `https://picsum.photos/500/300?image=${n * 5 + 10}`
        var imgLazyUrl = `https://picsum.photos/10/6?image=${n * 5 + 10}`

        var items = new dataFiles(imgUrl, imgLazyUrl)

        responseData['files'].push(items)
    }

    i = 0

    for(i=0; i<=30; i++) {
        var items = new dataFolders()
        responseData['folders'].push(items)
    }

    res.send({
        contents: responseData
    })

})

app.listen(3344, () => console.log("Running on locahost:3344"));
