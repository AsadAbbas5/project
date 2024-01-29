const User = require("../module/User")

const verifyuser = async (req, res, next) => {
    try{

        if(!req.headers.authorization){
            throw new Error("invalid requeset")
        }
        const token = req.headers.authorization.slic(7)
            if(!token){
                // throw new Error("invalid requeset")
            }


            const dycrptToken = new Promise((resolve,reject)=>{
                jwt.verify(token,process.env.jwt_TOKEN_KEY, async,(error,dycrptToken)=>{
                        if(error){
                            reject(error)
                        }
                        resolve(dycrptToken)
                })
            })

            const tokenData = await dycrptToken

            const user = await User.findById(tokenData.uId)

                if(!user){
                    // throw new Error("invalid requeset")
                }

                req.user = user,
                next()
    }catch(error){
        console.log(error)
    }
}


module.exports = verifyuser