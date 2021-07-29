const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors())

router.route("/:reviewId")
.put(controller.update)
.delete(controller.destroy)
.all(methodNotAllowed);

module.exports = router