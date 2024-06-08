import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Non autorisé - Aucun jeton fourni" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Non autorisé - Jeton invalide" });
        }
        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, username: true, fullname: true, profilePic: true } });
        if (!user) {
            return res.status(404).json({ error: "Aucun utilisateur trouvé" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Erreur dans protectRoute middlware", error.message);
        res.status(500).json({ error: "Erreur serveur interne" });
    }
};
export default protectRoute;
