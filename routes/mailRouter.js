const express = require("express");
const router = express.Router();


const { userData, sendEmail } = require("../controllers/mailController");


router.post("/details", userData);
router.post("/sendEmail", sendEmail);

module.exports = router;
