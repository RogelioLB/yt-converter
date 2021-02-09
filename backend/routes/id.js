const ytdl = require('ytdl-core');
const {Router}=require('express');


const routes=Router();

routes.post("/",(req,res)=>{
    let id=ytdl.getVideoID(req.body.url);
    res.send({id:id});
})

module.exports=routes;