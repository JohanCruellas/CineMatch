const auth = require("../middleware/auth");

module.exports = app => {
    const controller = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/login", controller.login);
    router.post("/", controller.create);

    router.get("/", [auth.verifyToken], controller.getAll);

    router.delete("/:id", [auth.verifyToken], controller.delete);

    app.use('/user', router);
};