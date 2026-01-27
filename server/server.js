import express from 'express'
import cors from 'cors' // To be able to connect backend with any other domain
import 'dotenv/config' // To be able to use env variables
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

// Initialize Express
const app = express()

// Connect to Database
await connectDB()

// Middlewares
app.use(cors())

// Routes
app.get('/', (req, res)=> res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhooks)

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})
