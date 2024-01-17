const jwt = require('jsonwebtoken')
const db = require('../models/db')
const { User } = db.models

verifyToken = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token']
        let requestUser = req.headers['x-access-user'] ? JSON.parse(req.headers['x-access-user']) : null
        if (!token) {
            return res.status(401)
                .send({
                    code: 'NO_TOKEN',
                    message: 'No token provided'
                })
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401)
                    .send({
                        code: 'BAD_TOKEN',
                        message: 'Bad Token'
                    })
            }
            req.userId = decoded
            const user = await User.findOne({ where: { id: decoded }, attributes: ['id', 'username', 'email', 'isAdministrator'] })
            if (!user) {
                return res.status(404).send({
                    code: 'USER_NOT_FOUND',
                    message: 'User not found'
                })
            }

            if(user.isAdministrator !== requestUser.isAdministrator){
                return res.status(403).send({
                    code: 'FORBIDDEN',
                    message: 'Forbidden'
                })
            }
            next()
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            code: 'INTERNAL_ERROR',
            message: error
        })
    }
}

const auth = {
    verifyToken: verifyToken,
}

module.exports = auth