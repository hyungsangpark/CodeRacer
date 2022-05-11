import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import MatchHistory from "../models/MatchHistory";

const createMatchHistory = (req: Request, res: Response, next: NextFunction) => {
    const { users } = req.body.users;

    const matchHistory = new MatchHistory({
        _id : new mongoose.Types.ObjectId(),
        users,
    });

    return matchHistory.save()
        .then(() => res.status(201).json({ matchHistory }))
        .catch((error: Error) => res.status(500).json({ error }));
};

const getMatchHistory = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    return MatchHistory.findById(id)
        .then((matchHistory) => (matchHistory ? res.status(200).json({ matchHistory }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const getMatchHistories = (req: Request, res: Response, next: NextFunction) => {
    return MatchHistory.find()
        .then((matchHistories) => res.status(200).json({ matchHistories }))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createMatchHistory,
    getMatchHistory,
    getMatchHistories,
};