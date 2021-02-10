const express=require('express');
const morgan=require('morgan');
const path=require('path');
const cors = require("cors");

const app=express();

app.use(cors());

var http = require('http').createServer(app);
const io=require('socket.io')(http,{
    cors:{
        origin:"*"
    }
});




io.on('connection', function(socket){
    console.log('user connected with socketId '+socket.id);
  
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});



app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set("port",process.env.PORT||5000);
app.set("socket",io);

app.use(express.static(path.resolve(__dirname,'../frontend/build')))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})

app.use("/url",require('./routes/ytdl'));
app.use("/id",require('./routes/id'));

http.timeout = 0;

http.listen(app.get("port"),()=>{
    console.log("Listen in localhost:"+app.get("port"));
}).on("error",(err)=>{
    console.log(err);
})

process.on("uncaughtException",(err)=>{
    console.log(err);
})