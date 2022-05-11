import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from "../models/User";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body.name;
  const { profilePicture } = req.body.profilePicture;
  const { avgStats } = req.body.averageStats;

  const user = new User({
    _id : new mongoose.Types.ObjectId(),
    name,
    profilePicture,
    avgStats,
  });

  return user.save()
    .then(() => res.status(201).json({ user }))
    .catch((error: Error) => res.status(500).json({ error }));
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return User.findById(id)
      .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' })))
      .catch((error) => res.status(500).json({ error }));
};

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
      .then((users) => res.status(200).json({ users }))
      .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return User.findById(id)
      .then((user) => {
        if (user) {
          user.set(req.body);

          return user
              .save()
              .then((user) => res.status(201).json({ user }))
              .catch((error) => res.status(500).json({ error }));
        } else {
          return res.status(404).json({ message: 'not found' });
        }
      })
      .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return User.findByIdAndDelete(id)
      .then((user) => (user ? res.status(201).json({ user, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
      .catch((error) => res.status(500).json({ error }));
};

export default {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};