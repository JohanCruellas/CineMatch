module.exports = app => {
    const controller = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/login", controller.login);

    app.use('/user', router);
};