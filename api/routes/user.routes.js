module.exports = app => {
    const controller = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/login", controller.login);
    router.post("/logout", controller.logout);
    router.post("/", controller.create);

    app.use('/user', router);
};