import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logger from "../../util/Logger";
import {IExample} from "../../models/Example";

export const ValidateJoi = (schema: ObjectSchema) => {
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


export const Schemas = {
    example: {
        create: Joi.object<IExample>({
            name: Joi.string().required(),
        }),
        update: Joi.object<IExample>({
            name: Joi.string().required(),
        })
    }
};