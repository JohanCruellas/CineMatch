const auth = require("../middleware/auth");

module.exports = app => {
    const controller = require("../controllers/media.controller.js");
    var router = require("express").Router();

    router.get("/discover", [auth.verifyToken], controller.discover);
    router.get("/genres", [auth.verifyToken], controller.genres);
    router.get("/search", [auth.verifyToken], controller.search)
    router.get("/joint/:targetUserId", [auth.verifyToken], controller.getJointMedias)

    app.use('/media', router);
};