import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import UserRoutes from './routes/userRoutes.js'

const PORT = process.env.SERVER_PORT || 3000

const app = express()

app.use(express.json())

app.use(cors())

const enterPoint = '/api'

app.use(enterPoint, UserRoutes)

app.listen(PORT, () => {
    console.log(`Server in port ${PORT}`)
})


