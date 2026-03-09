import { Request, Response } from 'express';
import prisma from '../DB/connectDB';

export const addCategory = async (req: Request, res: Response) => {
    try {
        const { name, imageUrl } = req.body;

        if (!name) {
            res.status(400).json({ success: false, message: 'Name is required' });
            return;
        }

        const category = await prisma.category.create({
            data: {
                name,
                imageUrl,
            }
        });

        res.status(201).json({ success: true, data: category });

    } catch (error) {
        console.error('Add category error:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

export const getAllCategory = async (req: Request, res: Response) => {
    try {
        const category = await prisma.category.findMany()
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
}