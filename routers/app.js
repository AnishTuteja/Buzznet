const express = require("express");
const router = express.Router();
const post = require("../controllers/app/post");
const user = require("../controllers/app/user");
const about = require("../controllers/app/about");
const getPosts = require("../controllers/app/getPosts");
const verifyToken = require("../middlewares/verifyToken");
const getAllPosts = require("../controllers/app/getAllPosts");
const likePost = require("../controllers/app/likePost");

router.route("/feed").get(verifyToken, (req, res) => res.render("feed"));
router.route("/profile").get(verifyToken, (req, res) => res.render("profile"));
router.route("/user").get(verifyToken, user);
router.route("/post").post(verifyToken, post).get(verifyToken, getPosts);
router.route("/about").post(verifyToken, about);
router.route("/getAllPosts").get(verifyToken, getAllPosts);
router.route("/:postId/likePost").get(verifyToken, likePost);

module.exports = router;
