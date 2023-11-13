const express = require("express");
const router = express.Router();
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");

router
    .route("/register")
    .post(register)
    .get((req, res) => res.render("register"));
router
    .route("/login")
    .get((req, res) => res.render("login"))
    .post(login);

module.exports = router;
