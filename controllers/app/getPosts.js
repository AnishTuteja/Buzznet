const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                posts: true,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.posts);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
