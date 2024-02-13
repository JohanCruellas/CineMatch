const auth = require("../middleware/auth");

module.exports = app => {
    const controller = require("../controllers/list.controller.js");
    var router = require("express").Router();

    router.post("/", [auth.verifyToken], controller.create);

    router.put("/:id", [auth.verifyToken], controller.update);

    router.delete("/:id", [auth.verifyToken], controller.delete);

    router.get("/", [auth.verifyToken], controller.getAll);
    router.get("/:id", [auth.verifyToken], controller.findOne);

    app.use('/list', router);
};