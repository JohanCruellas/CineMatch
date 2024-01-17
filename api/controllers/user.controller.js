const db = require("../models/db.js")
const { User } = db.models
const jwt = require('jsonwebtoken')


exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({
            where: {
                username: username
            }
        })
        if (!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }
        if (user.password != password) {
            return res.status(401).json({
                message: "Invalid credentials."
            })
        }
        return res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                isAdministrator: user.isAdministrator
            },
            token: jwt.sign(user.id, process.env.JWT_SECRET)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}