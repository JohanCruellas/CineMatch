const db = require("../models/db.js")
const fetch = require('node-fetch');
const TMDBBaseUrl = 'https://api.themoviedb.org/3';
const { List } = db.models

exports.discover = async (req, res, next) => {
    const page = req.query.page

    const genres = req.query.genres
    const releaseYearMin = req.query.releaseYearMin
    const rating = req.query.rating

    const url = `${TMDBBaseUrl}/discover/movie?api_key=61ed188065aae853df439585bf87fc33
        &language=fr-FR
        &sort_by=popularity.desc
        &include_adult=false
        &page=${page}
        ${genres ? `&with_genres=${genres}` : ''}
        ${releaseYearMin ? `&primary_release_date.gte=${releaseYearMin}-01-01` : ''}
        ${rating ? `&vote_average.gte=${rating}` : ''}
        `;
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

exports.genres = async (req, res, next) => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=fr';
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

exports.languages = async (req, res, next) => {
    const url = 'https://api.themoviedb.org/3/configuration/languages';
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