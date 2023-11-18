const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            return res.status(500).json({ error: "Post Not Found" });
        }
        await prisma.post.update({
            where: { id: postId },
            data: { likes: { increment: 1 } },
        });
        res.status(200).json({ success: "Post liked!" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
