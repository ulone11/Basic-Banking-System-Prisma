var express = require("express");
const AccountsController = require("../../../controllers/accounts.controller");
var router = express.Router();

router.get("/", AccountsController.getAllAccounts);
router.get("/:id", AccountsController.getAccountById);
router.post("/", AccountsController.createAccount);
router.put("/:id", AccountsController.updateAccount);
router.delete("/:id", AccountsController.deleteAccount);

module.exports = router;
