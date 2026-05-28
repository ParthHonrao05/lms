import express from 'express'
import cors from 'cors' // To be able to connect backend with any other domain
import 'dotenv/config' // To be able to use env variables
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoutes.js'
import userRouter from './routes/userRoutes.js'

// Initialize Express
const app = express()

// Connect to Database
await connectDB()
await connectCloudinary()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res)=> res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// Port
const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})
