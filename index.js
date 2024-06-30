import express from "express"
import path from "path"
import userRoute from "./routes/user.route.js"
import mongoose from "mongoose";


const app=express();
const PORT=8002;
app.use(express.urlencoded({extended:false}))
app.use("/user",userRoute)

mongoose.connect("mongodb://localhost:27017/blogify")
.then((e)=>console.log("mongodb connected"))
.catch((e)=>console.log(e))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.listen(PORT,()=>console.log(`server listen on Port:${PORT}`))
app.get("/",(req,res)=>{
    res.render("home")
})
