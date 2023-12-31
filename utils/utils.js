
const jwt = require("jsonwebtoken")
const moment = require("moment/moment")

const creatToken = (user, expireTimeHours = 100) => {
    const payload = {
        uId: user.Id,
        iat: moment().unix(),
        exp:moment().add(expireTimeHours,"hours").unix(),
        claims:{
                    email:user.email
        }
    }
            const token = new Promise((resolve,reject)=>{
                
                        jwt.sign(payload,process.env.jwt_TOKEN_KEY,(error,token)=>{
                            if(error){

                                reject(error)
                            }
                            resolve (token)
                        })
            })
            return token
}

module.exports = {
    creatToken
}