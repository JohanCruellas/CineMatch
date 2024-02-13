const { compareSync } = require("bcrypt")
const db = require("../models/db.js")
const { List } = db.models

exports.create = async (req, res, next) => {
}

exports.getAll = async (req, res, next) => {
    try {
        let lists = await List.findAll({
            where: {
                creator: req.query.userId
            }
        })
        return res.status(200).json(lists)
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

exports.findOne = async (req, res, next) => {
}

exports.update = async (req, res, next) => {
    try {
        let list = await List.findByPk(req.params.id)
        if (!list) {
            return res.status(404).json({
                message: "List not found."
            })
        }

        let updatedList = await list.update(req.body)
        return res.status(200).json(updatedList)
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error."
        })

    }
}

exports.delete = async (req, res, next) => {
}