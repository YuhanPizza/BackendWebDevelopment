//express library
const express = require('express');
const app = express();

const path = require('path');
//PORT
const HTTP_PORT = process.env.PORT || 5000;

//Global array used as database 
let storeVal = [];

const onHttpStart = () =>{
    console.log(`Parking app listening at port: ${HTTP_PORT}`);
}

// so you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded({ extended: true }));//parsing means analyzing and converting a program into an internal format that can be ran during runtime

//endpoints
//submit
app.post('/submit',(req,res)=>{
    //console.log('submission process');
    if(req.body.hours <= 8 ){
        let tax = req.body.hours * req.body.park * 0.13;
        let total = req.body.hours * req.body.park + tax;

        //sending html format
        res.send(`<head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href='/style.css' />
        <title>Validate</title>
    </head>
    <header></header>
    <body style='
        background-color: red;
        background-image: url("/giphy.gif");
        background-repeat: no-repeat;
        background-position:center center;
        background-size: cover;
        text-align: center; 
        border-radius: 5%; 
        margin-top: 20%;'>
        <title>
            <h2 style = 'color: red;'>Your Receipt</h2>
        </title>
            <main>
                <h3 style = 'color: white;style = "font-family:'Press Start 2P', cursive;"'>Requested hours: <span style='color :#ffffff;style = "font-family:'Press Start 2P', cursive;"'>${req.body.hours}</span></h3>
                <h3 style = 'color: red;style = "font-family:'Press Start 2P', cursive;"'>Hourly rate: <span style = 'color: #ffffff;style = "font-family:'Press Start 2P', cursive;"'>${req.body.park}</span></h3>
                <h3 style = 'color: red;style = "font-family:'Press Start 2P', cursive;"'>Subtotal: <span style = 'color: #ffffff;style = "font-family:'Press Start 2P', cursive;"'>${req.body.hours * req.body.park}</span></h3>
                <h3 style = 'color: #ffffff;style = "font-family:'Press Start 2P', cursive;"'>Total: <br><span style = 'color: #ffffff;style = "font-family:'Press Start 2P', cursive;"'>${total}</span></h3>
            </main>
        </body>`);
        storeVal.push(total); //saving it into the global array
    }
    else{
    res.send(`
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href='/style.css' />
        <title>Validate</title>
    </head>
    <header></header>
    <body 
    style = 'red;
    background-image: url("/giphy.gif");
    background-repeat: no-repeat;
    background-position:center center;
    background-size: cover;
    text-align: center; 
    border-radius: 5%; 
    margin-top: 20%;'>
    <main style = 'color: white; font-family:"Press Start 2P", cursive;'>
    <h2>
    <strong>Error: 
    </strong></h2>
    The maximum number of hours is 8.
    </main>
    </body>`);
    }
});
//home page payment form
app.get('/',(req,res)=>{
    //console.log('inside HOME PAGE');
    res.sendFile(path.join(__dirname,'index.html')); //this should return the index.html
});

//admin form
app.get('/admin',(req,res)=>{
    //console.log('inside Admin Page');
    res.sendFile(path.join(__dirname,'admin.html')); //this should return the admin location
});

//validation
app.post('/validate',(req,res)=>{
    //console.log('validation process');
    if(req.body.user !== 'admin' || req.body.pWord !== '0000'){ //can i use this logic ? or should i just use '===' ?
        res.send(`<head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href='/style.css' />
        <title>Validate</title>
    </head>
    <header></header><body style='red;
        background-image: url("/giphy.gif");
        background-repeat: no-repeat;
        background-position:center center;
        background-size: cover;
        text-align: center; 
        border-radius: 5%; 
        margin-top: 20%;'>
            <main>
                <h3 style = 'color: white; style = "font-family:'Press Start 2P', cursive;"'>Invalid Credentials</span></h3>
            </main>
        </body>`)
    }
    else{
        let sum = 0;
        for(let i = 0; i < storeVal.length; i++){ 
            sum += storeVal[i];
        }
        res.send(`<head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href='/style.css' />
        <title>Validate</title>
    </head>
    <header></header>
    <body style='red;
        background-image: url("/giphy.gif");
        background-repeat: no-repeat;
        background-position:center center;
        background-size: cover;
        text-align: center; 
        border-radius: 5%; 
        margin-top: 20%;'>
            <main>
                <h3 style = 'color: white; style = "font-family:'Press Start 2P', cursive;"'>Total Cars: <span style='color :#ffffff;'>${storeVal.length}</span></h3>
                <h3 style = 'color: white; style = "font-family:'Press Start 2P', cursive;"'>Total Money Collected: <span style = 'color: #ffffff;'>${sum.toFixed(2)}</span></h3>
            </main>
        </body>`);
    }
});

//style.css
app.get('/style.css',(req,res)=>{
    //console.log('call to style.css');
    res.sendFile(path.join(__dirname,'style.css'));//location for style.css
});

//gif
app.get('/giphy.gif',(req,res)=>{
    res.sendFile(path.join(__dirname,'giphy.gif'));
});

app.listen(HTTP_PORT,onHttpStart);