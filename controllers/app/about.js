const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try {
        const userId = req.userId;
        const { about } = req.body;
        await prisma.user.update({
            where: { id: userId },
            data: { about },
        });
        res.status(200).json({ success: "About has been updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
};
