import tokensService from "../services/tokensService.js";

class TokensController {

    async renovateAccess(req, res){
        try {
            console.error("ACESSO RENOVADOOOOOOOOO")
            const response = await tokensService.generateAccessToken(req.user.data)
            return res.status(200).json({accessToken : response})
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    async getTokenExp (req, res){


        try {
            const {token} = req.query;
          
            const response = await tokensService.getTokenExpiration(token)

            res.status(response.code).json(response.response)
            
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

}

export default new TokensController ();//