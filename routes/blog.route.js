import { Router } from "express";
import express from "express"
import multer from "multer";
import path from "path"
import { Blog } from "../model/blog.model.js";
const app=express()
const router=Router();
app.use(express.static(path.resolve('./public')))
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve(`./public/upload`))
    },
    filename:function(req,file,cb){
        const filename=`${Date.now()}-${file.originalname}`
        cb(null,filename)
    }
})
const upload=multer({storage:storage})
router.get("/add-new",(req,res)=>{
    // console.log(req.user);

      res.render("addBlog",{
        user:req.user
    })
})
router.post("/",upload.single("coverImageurl"),async(req,res)=>{
    //  console.log(req.body);
    //  console.log(req.file);
    const {title,body}=req.body;
     const blog=await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageurl:`upload/${req.file.filename}`

    })
   return res.redirect(`/blog/${blog._id}`)
})
router.get('/:id',async(req,res)=>{
const blog=await Blog.findById(req.params.id).populate("createdBy")
console.log();
return res.render('blog',{
  user :req.user,
  blog  :blog
})
})
export  {router}