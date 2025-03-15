import jwt from 'jsonwebtoken'
import 'dotenv/config'
import tokensRepository from '../repository/tokensRepository.js'

class AuthService {

    async generateAccessToken(data, time = "4h") {
        const accessToken = jwt.sign({data},process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: time})
        return accessToken
    }

    async generateRefreshToken(data, time = "7d") {
        const refreshToken = jwt.sign({data},process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: time})
        return refreshToken
    }

    async addTokenRecoverPass(token, user_id){

        const time_expiration = new Date(Date.now() + 15 * 60 * 1000);
       
        const tokenInfo= {
            code: token,
            time_expiration,
            user_id
        }

        const response = await tokensRepository.add(tokenInfo)
        if(!response) return {code: 500, response:"error to add"}
        return {code: 200, response:response}
    }

    async getTokenExpiration(token){
        const tokenDb = await tokensRepository.getToken(token)

        if(!tokenDb) return {code: 404, response:""}
        const nowDate = new Date()
        const tokenDate = new Date(tokenDb.dataValues.time_expiration)
        console.log(tokenDate)
        console.log(nowDate)
        if(nowDate < tokenDate){
            return {code: 200, response:""}

        }else{
            return {code: 403, response:"expired token"}
        }
        
    }

}

export default new AuthService();