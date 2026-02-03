const express = require("express");
const { signupValidation, loginValidation } = require("../middlewares/AuthValidation");
const router = express.Router();
const {signup, login} = require("../controllers/AuthController");

router.post("/signup",signupValidation, signup);


router.post("/login",loginValidation, login);



module.exports = router;