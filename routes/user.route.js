import { Router } from "express";
import { User } from "../model/user.model.js";
const router=Router();

router.get("/sigin",(req,res)=>{
    return res.render("signin")
})
router.get("/signup",(req,res)=>{
    return res.render("signup")
})
router.post("/sigin",async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
    const user=await User.matchPassword(email,password);
    console.log("user",user);

    return res.redirect('/')
})
router.post("/signup",async(req,res)=>{
    // const user=req.body;
    const {fullName,email,password}=req.body;
    await User.create({
        fullName,
        email,
        password
    })
    // console.log(user);

return res.redirect("/")
})
export default router