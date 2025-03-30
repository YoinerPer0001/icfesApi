import Tokens from '../model/tokensModel.js'
import Users from '../model/userModel.js'

class TokensRepository {

    async add(token) {
        const response = await Tokens.create(token)
        return response
    }

    async getToken(token) {
        const response = await Tokens.findByPk(token, { include: { model: Users, as: "user", attributes: { exclude: ["updatedAt", "createdAt", "password"] } } }, { attributes: { exclude: ["updatedAt", "createdAt"] } })
        return response
    }
}


export default new TokensRepository();