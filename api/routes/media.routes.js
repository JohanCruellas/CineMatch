module.exports = app => {
    const controller = require("../controllers/media.controller.js");
    var router = require("express").Router();

    router.get("/discover", controller.discover);
    // router.get("/:id", controller.findOne);
    // router.put("/:id", controller.update);
    // router.delete("/:id", controller.delete);

    app.use('/media', router);
};