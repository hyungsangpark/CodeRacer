import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Example from "../models/Example";

const createExample = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const example = new Example({
    _id : new mongoose.Types.ObjectId(),
    name,
  });

  return example.save()
    .then(() => res.status(201).json({ example }))
    .catch((error: Error) => res.status(500).json({ error }));
};

const getExample = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return Example.findById(id)
      .then((example) => (example ? res.status(200).json({ example }) : res.status(404).json({ message: 'not found' })))
      .catch((error) => res.status(500).json({ error }));
};

const getExamples = (req: Request, res: Response, next: NextFunction) => {
  return Example.find()
      .then((examples) => res.status(200).json({ examples }))
      .catch((error) => res.status(500).json({ error }));
};

const updateExample = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name } = req.body;

  return Example.findById(id)
      .then((example) => {
        if (example) {
          example.set(req.body);

          return example
              .save()
              .then((example) => res.status(201).json({ example }))
              .catch((error) => res.status(500).json({ error }));
        } else {
          return res.status(404).json({ message: 'not found' });
        }
      })
      .catch((error) => res.status(500).json({ error }));
};

const deleteExample = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return Example.findByIdAndDelete(id)
      .then((example) => (example ? res.status(201).json({ example, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
      .catch((error) => res.status(500).json({ error }));
};

export default {
  createExample,
  getExample,
  getExamples,
  updateExample,
  deleteExample,
};