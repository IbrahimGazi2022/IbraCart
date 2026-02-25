import { Request, Response } from 'express';
import prisma from '../DB/connectDB';

// --- HELPER: MAP BANNER DATA ---
const mapBanner = (banner: any, type: string) => ({
    type,
    badgeText: banner.badgeText ?? null,
    badgeDiscount: banner.badgeDiscount ?? null,
    headingLine1: banner.headingLine1 ?? null,
    headingLine2: banner.headingLine2 ?? null,
    headingLine3: banner.headingLine3 ?? null,
    discount: banner.discount ?? null,
    title: banner.title ?? null,
    description1: banner.description1 ?? null,
    description2: banner.description2 ?? null,
    buttonText: banner.buttonText ?? null,
    imageUrl: banner.image ?? null,
    isActive: banner.isActive ?? true,
});

// --- GET HERO BANNERS ---
export const getHeroBanners = async (req: Request, res: Response) => {
    try {
        const banners = await prisma.heroBanner.findMany();
        res.status(200).json({ success: true, data: banners });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

// --- SAVE HERO BANNERS ---
export const saveHeroBanners = async (req: Request, res: Response) => {
    try {
        const { mainBanner, smallBanners } = req.body;

        await prisma.$transaction(async (tx) => {
            await tx.heroBanner.deleteMany();
            await tx.heroBanner.create({
                data: mapBanner(mainBanner, 'main'),
            });

            for (const banner of smallBanners) {
                await tx.heroBanner.create({
                    data: mapBanner(banner, 'small'),
                });
            }
        });

        res.status(200).json({ success: true, message: 'Hero banners saved' });
    } catch (error) {
        console.error('Hero save error:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};