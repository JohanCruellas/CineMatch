const db = require("../models/db.js")
const { User, Role } = db.models
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")
const bcryptUtils = require("../utils/bcrypt.utils.js")

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        let user = await User.findOne({
            where: {
                username: username
            },
            include: {
                model: Role,
                as: 'roles'
            }
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials."
            })
        }

        if (await bcryptUtils.comparePasswords(password, user.password) === false) {
            return res.status(401).json({
                message: "Invalid credentials."
            })
        }

        const tokenPayload = {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdministrator: user.roles.some(role => role.name === 'admin')
        }

        return res.status(200).json({
            user: tokenPayload,
            token: jwt.sign(tokenPayload, process.env.JWT_SECRET)
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
                [Op.or]: [{ username: username }, { email: email }]
            }
        })

        if (user) {
            return res.status(409).json({
                message: "User already exists."
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
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const { username } = req.query
        let users = await User.findAll({
            where: {
                username: username ? { [Op.like]: `%${username}%` } : { [Op.ne]: null }
            },
            include: {
                model: Role,
                as: 'roles'
            },
            attributes: ['id', 'username', 'email']
        })
        return res.status(200).json({
            users: users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params
        let user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }
        await user.destroy()
        return res.status(200).json({
            message: "User deleted."
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}