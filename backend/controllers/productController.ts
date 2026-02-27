import { Request, Response } from 'express';
import prisma from '../DB/connectDB';

export const addNewProduct = async (req: Request, res: Response) => {
    try {
        const { name, category, price, originalPrice, stock, weight, description, inStock, imageUrl, discount, rating } = req.body;

        if (!name || !price) {
            res.status(400).json({ success: false, message: 'Name and price are required' });
            return;
        }

        const product = await prisma.product.create({
            data: {
                name,
                category,
                price: parseFloat(price),
                originalPrice: originalPrice ? parseFloat(originalPrice) : null,
                stock: parseInt(stock) || 0,
                weight,
                description,
                inStock,
                imageUrl,
                discount: discount ? parseFloat(discount) : null,
                rating: rating ? parseFloat(rating) : 0,
            }
        });

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findMany()
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
}