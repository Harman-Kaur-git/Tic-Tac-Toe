const express=require("express");
const app=express();
const fs=require("node:fs");
app.use(express.static("public"));
function readAndSendFile(res,filename)
{
    fs.readFile(filename,"utf8",(err,data)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else{
            res.send(data);
        }
    })
}
app.get("/tictactoe",(req,res)=>{
    readAndSendFile(res,"tictoe.html");
})
app.listen(8080,()=>{
    console.log("server started at port 8080");
})