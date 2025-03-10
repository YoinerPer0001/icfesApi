import Users from '../model/userModel.js'

class UserRepository {

    async getxEmail(email){
        const response = await Users.findOne({ where: {email}})
        return response
    }

    async getById(id){
        const response = await Users.findByPk(id)
        return response
    }


    async create(user){
        const response = await Users.create(user)
        
        if(!response) throw new Error("Error to create user")

        return response
    }

}

export default new UserRepository();