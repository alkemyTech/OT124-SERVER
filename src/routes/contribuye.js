
const express = require("express");

const { postDonate, getDonatesUser, getDonatesAll } = require("../controllers/contribuye");
const { validation } = require("../middlewares/validator");
const { validateToken } = require("../middlewares/auth");
const router = express.Router();
// SDK de Mercado Pago
router.post("/process-payment",validateToken, postDonate)
router.get("/process-payment/user",validateToken, getDonatesUser)
router.get("/process-payment/all",validateToken, getDonatesAll)
module.exports = router;