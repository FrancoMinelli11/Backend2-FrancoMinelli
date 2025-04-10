import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/register',passport.authenticate('register', {}) ,(req, res) => {
    req.session.user = req.user
    res.redirect('/perfil')
})

router.post('/login', passport.authenticate('login', {}), (req, res) => {
    req.session.user = req.user
    res.redirect('/perfil')
})

router.get('/github', passport.authenticate('github',{}), (req, res) => {
})


export default router