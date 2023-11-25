const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000
app.use(express.json())
app.use(cors())

// app.use( (req, res, next)=> {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Authorization')
//     next();
// });

app.get('/',(req, res) =>{
    res.sendFile(path.join(__dirname, './data.json'))
})

app.post('/',(req, res) =>{
    console.log(req.body);
    let obj
    fs.readFile(path.join(__dirname,'./data.json'), (err, jsonData) => {
        if (err) throw err;
        obj = JSON.parse(jsonData)
        console.log(obj);
        obj['56h2fi'].push(req.body)
        fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify(obj), (error, response) => {
            console.log(error, response);
        });
    })
    res.sendFile(path.join(__dirname, './data.json'))
})

app.delete('/', (req, res) => {
    fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify({'56h2fi':[]}), (error, response) => {
        console.log(error, response);
    })
    res.sendFile(path.join(__dirname, './data.json'))
})

app.listen(process.env.PORT || port, ()=>{
    console.log("listening...");
})