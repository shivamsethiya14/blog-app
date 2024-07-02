import express from "express"
import path from "path"
import userRoute from "./routes/user.route.js"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { checkforAthentictionCokkie } from "./middleware/auth.js";
import {router} from "./routes/blog.route.js"
import { Blog } from "./model/blog.model.js";
const app=express();
const PORT=8002;
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.resolve('./public')))



app.use(cookieParser())
app.use(checkforAthentictionCokkie("token"))


app.get("/",async(req,res)=>{
    const allblog=await Blog.find({})
    res.render("home",{

        user:req.user,
        blogs:allblog
    })
})

mongoose.connect("mongodb://localhost:27017/blogify")
.then((e)=>console.log("mongodb connected"))
.catch((e)=>console.log(e))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.listen(PORT,()=>console.log(`server listen on Port:${PORT}`))
app.use("/user",userRoute)
app.use("/blog",router)