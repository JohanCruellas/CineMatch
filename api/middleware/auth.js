const jwt = require('jsonwebtoken')
const db = require('../models/db')
const { User, Role } = db.models

verifyToken = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token']
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

            const user = await User.findOne({
                where: { id: decoded.id },
                include: {
                    model: Role,
                    as: 'roles'
                },
                attributes: ['id', 'username', 'email']
            })
            req.currentUser = user

            if (!user) {
                return res.status(404).send({
                    code: 'USER_NOT_FOUND',
                    message: 'User not found'
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

adminAccess = async (req, res, next) => {
    if (req.currentUser.roles.some(role => role.name === 'admin')) {
        next()
    } else {
        return res.status(403).send({
            code: 'FORBIDDEN',
            message: 'Forbidden'
        })
    }
}

const auth = {
    verifyToken: verifyToken,
    adminAccess: adminAccess
}

module.exports = auth