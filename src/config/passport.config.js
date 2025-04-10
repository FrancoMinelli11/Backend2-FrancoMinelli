import passport from "passport";
import local from "passport-local";
import github from 'passport-github2'
import { UsersManager } from "../dao/usersManager.js";
import { passwordHash, validateHash } from "../utils.js";
import { config } from "./config.js";

export const initializePassport = () => {
    passport.use('register', new local.Strategy({usernameField:'email', passReqToCallback:true},
        async (req, username, password, done) => {
            try {
                const {name} = req.body
                if(!name) return done(null,false)
                const userExist = await UsersManager.getBy({email:username})
                if(userExist) return done(null,false)
                password = passwordHash(password)
                const newUser = await UsersManager.create({name,email:username,password})
                return done(null,newUser)
            } catch (error) {
                return done(error)
            }
        }))

        passport.use('login', new local.Strategy({usernameField:'email'},
            async (username, password, done) => {
                try {
                    const user = await UsersManager.getBy({email:username,github:false})
                    if(!user) return done(null,false)
                    if(!validateHash(password,user.password)) return done(null,false)
                    return done(null,user)
                } catch (error) {
                    return done(error)
                }
            }))

            passport.use('github', new github.Strategy({
                clientID: config.CLIENT_GIT,
                clientSecret:config.CLIENT_SECRET,
                callbackURL:'http://localhost:8080/perfilGit',
                scope: ['user:email']
            },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        const name = profile._json.name || profile.username
                        const email = profile.emails[0].value
                        if(!name || !email) return done(null, false)
                        let user = await UsersManager.getBy({email})
                        if(!user){
                            user = await UsersManager.create({name,email,github:true})
                        }
                        return done(null, user)
                    } catch (error) {
                        done(error)
                    }
                }
            ))

        passport.serializeUser((user,done) => {
            return done(null,user._id)
        })

        passport.deserializeUser(async (id, done) => {
            const user = await UsersManager.getBy({_id:id})
            return done(null, user)
        })
}