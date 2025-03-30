import userAttempsService from "../services/userAttempsService.js"


class UserAttempsController {

    async createAttemp(req, res){
        try {
            const data = req.body
            const response = await userAttempsService.create(data)
            return res.status(response.code).json(response.response)

        } catch (error) {
           res.status(500).json({error:error.message}) 
        }
    }

    async getByExamId(req, res){
        try {
            const {id} = req.query
            const response = await userAttempsService.getById(id)
            res.status(response.code).json(response.response)
        } catch (error) {
            res.status(500).json({error:error.message}) 
        }
    }
}

export default new UserAttempsController()