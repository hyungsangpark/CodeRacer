import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import CodeBlock from "../models/CodeBlock";

const createCodeBlock = (req: Request, res: Response, next: NextFunction) => {
    const { language, time, code } = req.body;

    const newCodeBlock = new CodeBlock({
        _id : new mongoose.Types.ObjectId(),
        language,
        time,
        code
    });

    return newCodeBlock.save()
        .then(() => res.status(201).json({ newCodeBlock }))
        .catch((error: Error) => res.status(500).json({ error }));
};

const getRandomCodeBlockBySettings = async (req: Request, res: Response, next: NextFunction) => {
    const {time, language, limit} = req.query;

    const codeBlocks = await CodeBlock.find({language, time});

    const randomisedCodeBlocks = codeBlocks.sort(() => 0.5 - Math.random());

    return res.status(200).json({ codeBlocks: randomisedCodeBlocks.slice(0, limit ? parseInt(limit.toString()) : 1) });
};

const getCodeBlock = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const codeBlock = await CodeBlock.findById(id);

    return res.status(200).json({ codeBlock });
};

export default {
    createCodeBlock,
    getRandomCodeBlockBySettings,
    getCodeBlock
}