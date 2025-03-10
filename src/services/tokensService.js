import jwt from 'jsonwebtoken'
import 'dotenv/config'

class AuthService {

    async generateAccessToken(data) {
        const accessToken = jwt.sign({data},process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: process.env.EXPIRE_ACCESS_TOKEN || "4h"})
        return accessToken
    }

    async generateRefreshToken(data) {
        const refreshToken = jwt.sign({data},process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: process.env.EXPIRE_REFRESH_TOKEN || "7d"})
        return refreshToken
    }

}

export default new AuthService();