const db = require("../models/db.js")
const fetch = require('node-fetch');
const TMDBBaseUrl = 'https://api.themoviedb.org/3';
const { List } = db.models

exports.discover = async (req, res, next) => {
    const page = req.query.page
    const url = `${TMDBBaseUrl}/discover/movie?api_key=61ed188065aae853df439585bf87fc33&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate `
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return res.status(200).json(json)
    } catch (err) {
        console.error('error:' + err);
    }
}

exports.findAll = async (req, res, next) => {
}

exports.findOne = async (req, res, next) => {
}

exports.update = async (req, res, next) => {
}

exports.delete = async (req, res, next) => {
}