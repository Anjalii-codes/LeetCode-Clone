import { UserRole } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {db} from "../libs/db.js";
export const register = async (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password) {
        return res.status(400).json(
            {
                msg: "Please enter all fields"
            })
    }
    try {
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })

        if(existingUser) {
            return res.status(400).json(
                {
                    msg: "User already exists"
                })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role:UserRole.USER
            }
        })
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(201).json({ 
            message: "User created successfully",
            user : {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image:newUser.image
            }
        })  
    } catch (error) {
        console.log(error, "error in creating user")
        res.status(500).json({
            msg: "Something went wrong"
        })
        
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        return res.status(400).json(
            {
                msg: "Please enter all fields"
            })
    }
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        if(!user) {
            return res.status(400).json(
                {
                    msg: "User does not exist"
                })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json(
                {
                    msg: "Invalid credentials"
                })
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ 
            message: "User logged in successfully",
            user : {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image:user.image
            }
        })  
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong"

        })
        
    }
};
