import bcrypt from "bcrypt";
import prisma from '../DB/connectDB';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
            },
        });
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const loginUser = (req: Request, res: Response) => { }

export const adminLogin = (req: Request, res: Response) => { }
