const express = require('express')
const app = new express()
const port = process.env.port || 2900

//Main Page Grabber
app.get('/', (req,res) => {
    res.sendFile('./index.html', {root:`./public/index`})
})

// / Pages Grabber
app.get(`/:name`, (req,res,next) => {
    let {name} = req.params
    res.sendFile(`.${name}/${name}.html`, {root:`./public`}, (err) => {
        if(err){
            console.error(err)
            next(err)
            //doesnt work until first media grab idk why im just gonna roll with it index will be grabbing media anyways so doesnt really need to be fixed 
        }
    })
})

// Media Grabber
app.get(`/:name2/:name3.:ext`, (req,res,next) => {
    let{name2,name3,ext} = req.params
    console.log('hi')
    if(ext != 'html'){
        res.sendFile(`./${name2}/${name3}.${ext}`, {root: `./public`}, (err) => {
            if(err){
                console.error(err)
                next(err)
            }
        })
    }
    else{
        next(new Error("Cannot Get Html Files"))
    }

    //Error For Others
    app.use("*",(req,res,next) => {
        console.log('meep')
        throw new Error("Not Found")
    })

    //404 Handeler
    app.use((err,req,res,next) => {
        res.status(404).sendFile('./404.html', {root: `./public/404`})
    })
})

app.listen(port, () => console.log(`Listening On Port: ${port}`))