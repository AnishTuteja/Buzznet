const express = require("express");
const router = express.Router();
const post = require("../controllers/app/post");
const user = require("../controllers/app/user");
const about = require("../controllers/app/about");
const getPosts = require("../controllers/app/getPosts");
const verifyToken = require("../middlewares/verifyToken");

router.route("/feed").get(verifyToken, (req, res) => res.render("feed"));
router.route("/profile").get(verifyToken, (req, res) => res.render("profile"));
router.route("/user").get(verifyToken, user);
router.route("/post").post(verifyToken, post).get(verifyToken, getPosts);
router.route("/about").post(verifyToken, about);

module.exports = router;
