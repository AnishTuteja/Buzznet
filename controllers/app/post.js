const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try {
        const userId = req.userId;
        const { content } = req.body;
        const newPost = await prisma.post.create({
            data: {
                content,
                userId,
            },
        });
        res.status(201).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to create the post" });
    }
};
