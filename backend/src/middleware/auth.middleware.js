import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";  

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
            message: "Error authenticating user",
            error :error.message
        })
    }
};
export const checkAdmin = async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
               
                role: true,
            }
        })
        if(!user || user.role!=="ADMIN"){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - User is not an admin"
            })
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error authenticating user",
            error :error.message
        })
        
    }
}
