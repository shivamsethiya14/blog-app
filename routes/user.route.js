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
    try {
      
    // console.log(email,password);
    const token=await User.matchPasswordAndGentatetoken(email,password);
    // console.log("token",token);

    return res.cookie("token",token).redirect('/')
    } catch (error) {
        return res.render("signin",{
            error:"incorect email or password"
        })
    }
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
router.get("/logout",(req,res)=>{
   res.clearCookie("token").redirect("/") 
})
export default router