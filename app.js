const express = require("express")
const app = express()
const path = require('path')
const fs = require("fs")
const port = process.env.PORT || 3000

app.use(function(req, res, next){
    console.log("request data:" + new Date());
    //res.send("welcome middleware app") //end() send() sendFile()
        //or
     next()
})
app.use(function(req, res, next){
    var filepath = path.join(__dirname, "static", req.url)
    fs.stat(filepath, function(err, fileInfo){
        if(err){
            next()
            return
        }
        if(fileInfo.isFile()){
            res.sendFile(filepath)
        }else{
            next()
    }
})
})

app.use(function(req, res){ //middleware stack !important
    res.status(404)
    res.send("not found")
})

app.listen(port, ()=>{
    console.log("running");
})