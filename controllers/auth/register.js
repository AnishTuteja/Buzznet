const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await prisma.user.findFirst({
            where: {
                username,
            },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Username is taken." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        res.status(201).json({ success: "New user created" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register user. " });
    }
};
