const db = require("../models/db.js")
const { User, List } = db.models
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({
            where: {
                username: username
            },
            // include: [
            //     {
            //         model: List,
            //         as: "lists",
            //     }
            // ]
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
                // isAdministrator: user.isAdministrator
                // lists: user.lists,
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

exports.logout = async (req, res, next) => {
    try {
        return res.status(200).json({
            message: "Logged out."
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

exports.create = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        let user = await User.findOne({
            where: {
                username: username
            }
        })

        if (user) {
            return res.status(409).json({
                message: "Username already exists."
            })
        }
        
        user = await User.create({
            username: username,
            email: email,
            password: password
        })
        return res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                isAdministrator: user.isAdministrator
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}