import {Schema,model,mongoose} from "mongoose";
import {createHmac,randomBytes} from "node:crypto"
const userSchema= new Schema({
    fullName:{
        type :String,
        required :true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
        
    },
    profileImage:{
        type:String,
        default:"/Image/defaultImage.jpeg"
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }


},{timestamps:true})
userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified('password')) return;

    const salt =randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password=hashedPassword;
    next();
})
userSchema.static('matchPassword', async function(email,password){
    const user= await User.findOne({email})
    if(!user) throw new Error('user not Found')

    const salt=user.salt;
    const hashedPassword=user.password;

    const userProvidedPassword=createHmac('sha256',salt).update(password).digest("hex");
    
    if(hashedPassword!==userProvidedPassword)   throw new Error('Incorrect Password');

    return {...user,password:undefined,salt:undefined}
})
export const User=mongoose.model('user',userSchema)