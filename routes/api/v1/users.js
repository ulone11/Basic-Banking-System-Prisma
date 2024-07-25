var express = require("express");
const CustomerController = require("../../../controllers/users.controller");
var router = express.Router();

router.get("/", CustomerController.getAllUser);
router.get("/:id", CustomerController.getUserById);
router.post("/", CustomerController.createUserWithProfile);

module.exports = router;
