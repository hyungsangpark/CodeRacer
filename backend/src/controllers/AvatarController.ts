import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Avatar from "../models/Avatar";

const createAvatar = (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;

    const newAvatar = new Avatar({
        _id : new mongoose.Types.ObjectId(),
        url
    });

    return newAvatar.save()
        .then(() => res.status(201).json({ newAvatar }))
        .catch((error: Error) => res.status(500).json({ error }));
};

const getRandomAvatar = async (req: Request, res: Response, next: NextFunction) => {

    const count = await Avatar.count();
    const rand = Math.floor(Math.random() * count);

    const randomAvatar = await Avatar.findOne().skip(rand);

    return res.status(200).json({ avatar: randomAvatar });
};

export default {
    createAvatar,
    getRandomAvatar
}