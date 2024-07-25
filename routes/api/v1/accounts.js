var express = require("express");
const AccountsController = require("../../../controllers/accounts.controller");
var router = express.Router();

router.get("/", AccountsController.getAllAccounts);
router.get("/:id", AccountsController.getAccountById);
router.post("/", AccountsController.createAccount);

module.exports = router;
