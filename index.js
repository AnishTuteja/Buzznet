const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routers/auth");
const appRoutes = require("./routers/app");
const verifyToken = require("./middlewares/verifyToken");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.set("view engine", "ejs");

app.get("/", verifyToken, (req, res) => res.redirect("/app/feed"));
app.use("/auth", authRoutes);
app.use("/app", appRoutes);

app.listen(3000, () => {
    console.log("Server started at PORT 3000");
});
