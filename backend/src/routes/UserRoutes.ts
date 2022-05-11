import express from 'express';
import {Schemas, ValidateBody} from "../middleware/InputValidation/Joi";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post('/create', ValidateBody(Schemas.user.create), UserController.createUser);
router.get('/get/:id', UserController.getUser);
router.get('/get', UserController.getUsers);
router.patch('/update/:id', ValidateBody(Schemas.user.update), UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);

export = router;