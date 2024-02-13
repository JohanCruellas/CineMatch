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

exports.search = async (req, res, next) => {
    const searchStr = req.query.searchStr
    const page = req.query.page

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=fr-FR&page=${page}&query=${searchStr}`;
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

exports.getJointMedias = async (req, res, next) => {
    try {
        const targetUserId = req.params.targetUserId
        const targetList = await List.findOne({
            where: {
                creator: targetUserId,
                mainList: true
            }
        })
        const callerList = await List.findOne({
            where: {
                creator: req.currentUser.id,
                mainList: true
            }
        })

        let jointListIds = targetList.likedMedias.filter(media => callerList.likedMedias.includes(media))
        let jointList = []

        for (id of jointListIds) {
            const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
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

                jointList.push(json)

            } catch (err) {
                console.error('error:' + err);
            }
        }

        return res.status(200).json(jointList)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}