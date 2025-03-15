import Tokens from '../model/tokensModel.js'

class TokensRepository {

    async add(token){
        const response = await Tokens.create(token)
        return response
    }

    async getToken(token){
        const response = await Tokens.findByPk(token)
        return response
    }
}


export default new TokensRepository();