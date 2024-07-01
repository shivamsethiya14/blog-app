import jwt from "jsonwebtoken"
const secret ="$uperMan@123"

function createTokenForuser(user){
    const payload={
        _id:user._id,
        email:user.email,
        proflieImageUrl:user.profileImage,
        role:user.role,
    };
    const token= jwt.sign(payload,secret);
    return token;

}
function validateToken(token){
    const payload=jwt.verify(token,secret);
    return payload;
}
export {createTokenForuser,validateToken}