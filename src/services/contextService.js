import contextRepository from "../repository/contextRepository.js";


class ContextService {
    async create (data){
        const response = await contextRepository.create(data)
        if(!response) return {code: 500, response: "error creating context"}

        return {code: 200, response: response}
    }
}

export default new ContextService();