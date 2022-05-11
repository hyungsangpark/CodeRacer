import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logger from "../../util/Logger";
import {IExample} from "../../models/Example";
import {IUser} from "../../models/User";
import {ICodeBlock} from "../../models/CodeBlock";
import {IMatchHistory} from "../../models/MatchHistory";

export const ValidateBody = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logger.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const ValidateQuery = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.query);

            next();
        } catch (error) {
            Logger.error(error);

            return res.status(422).json({ error });
        }
    };
};


export const Schemas = {
    example: {
        create: Joi.object<IExample>({
            name: Joi.string().required(),
        }),
        update: Joi.object<IExample>({
            name: Joi.string().required(),
        })
    },
    user: {
        create: Joi.object<IUser>({
            name: Joi.string().required(),
        }),
        update: Joi.object<IUser>({
            name: Joi.string().required(),
        })
    },
    matchHistory: {
        create: Joi.object<IMatchHistory>({}),
        codeBlock: {
            create: Joi.object<ICodeBlock>({
                language: Joi.string().required(),
                time: Joi.string().required(),
                code: Joi.string().required(),
            }),
            get: Joi.object({
                language: Joi.string().required(),
                time: Joi.string().required(),
                limit: Joi.number().optional(),
            }),
        }
    },
    codeBlock: {
        create: Joi.object<ICodeBlock>({
            language: Joi.string().required(),
            time: Joi.string().required(),
            code: Joi.string().required(),
        }),
        get: Joi.object({
            language: Joi.string().required(),
            time: Joi.string().required(),
            limit: Joi.number().optional(),
        }),
    }
};