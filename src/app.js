import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import UserRoutes from './routes/userRoutes.js'
import ExamenRoutes from './routes/examenRoutes.js'
import ExamQuestionRoutes from './routes/examQuestionRoutes.js'
import UserAttempsRoutes from './routes/userAttempsRoutes.js'
import QuestionRoutes from './routes/questionRoutes.js'
import CategoriesRoutes from './routes/categoryRoutes.js'

const PORT = process.env.SERVER_PORT || 3000

const app = express()

app.use(express.json())

app.use(cors())

const enterPoint = '/api'

app.use(enterPoint, UserRoutes)
app.use(enterPoint, ExamenRoutes)
app.use(enterPoint, ExamQuestionRoutes)
app.use(enterPoint, UserAttempsRoutes)
app.use(enterPoint, QuestionRoutes)
app.use(enterPoint, CategoriesRoutes)

app.listen(PORT, '0.0.0.0', ()=>{
    console.log("Ejecutandose en el puerto: " + PORT)
})

