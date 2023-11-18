const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jwt.sign({ userId: user.id }, SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to log in" });
    }
};
