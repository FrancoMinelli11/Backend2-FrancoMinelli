import express from "express";
import session from "express-session";
import connectMongo from "connect-mongo";
import handlebars from "express-handlebars";
import userRouter from "./routes/user.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js"
import mongoose from "mongoose";
import { config } from "./config/config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

const app = express()
const port = config.PORT
const mongoUrl = config.MONGO_URL
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('/src/public'))
app.use(session({
    store: connectMongo.create({
        mongoUrl: 'mongodb+srv://Francol11:Francol11@cluster0.sfltl.mongodb.net/',
        dbName: 'session',
        ttl: 3600
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use('/user', userRouter)
app.use('/session', sessionRouter )
app.use('/', viewsRouter)


const connect = async () => {
    try {
        await mongoose.connect(mongoUrl,{
            dbName: 'session'
        })
        console.log('Connected to MongoDB')
        app.listen(port, () => console.log(`Server listening on port ${port}!`))
    } catch (error) {
        console.log(error)
    }
}
connect()


