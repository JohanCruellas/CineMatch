const db = require("../models/db.js")
const { Role, User } = db.models

exports.getAll = async (req, res, next) => {
    try {
        let roles = await Role.findAll()
        return res.status(200).json(roles)
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

exports.update = async (req, res, next) => {
    try {
        const { userId } = req.params
        const { roles } = req.body

        console.log(userId)
        console.log(roles)

        let user = await User.findByPk(userId)
        user.setRoles(roles)

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        return res.status(200).json({
            message: "Roles updated."
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}
