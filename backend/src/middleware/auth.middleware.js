import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
            
        }
        let decoded;
        try {
            decoded= jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token"
            })
        }
        const user = await db.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true
            }
        })
        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error authenticating user"
        })
    }
}