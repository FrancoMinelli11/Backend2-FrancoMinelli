export const auth = (req, res, next) => {
    if(!req.session.user) return res.status(401).json({status:'error', message:'No autorizado'})
    next()
}