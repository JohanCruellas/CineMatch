const auth = require("../middleware/auth");

module.exports = app => {
    const controller = require("../controllers/role.controller.js");
    var router = require("express").Router();

    router.get("/", [auth.verifyToken, auth.adminAccess], controller.getAll);

    router.put("/:userId", [auth.verifyToken, auth.adminAccess], controller.update);

    app.use('/role', router);
};