import { Router } from "express"
import { auth } from "../middlewares/auth.js"
import passport from "passport"

const router = Router()

router.get("/", (req, res) => {
    res.render("index")
})

router.get('/perfil',auth, (req, res) => {
    req.session.user = req.user
    res.render('perfil', {userExist: req.session.user})
})

router.get('/perfilGit', passport.authenticate('github',{}), (req, res) => {
    req.session.user = req.user
    res.redirect('/perfil')
})


export default router