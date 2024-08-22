import express from 'express';

const app = express();
const Port = 3000;

app.use = (express.json()); 

// Getting the default Router

app.get("/",  (req, res) =>  {
    res.send ("Welcome to server.js environment");
});

app.listen (Port, ()=> {
    console.log (`Server is listening on port, ${Port}`)
});