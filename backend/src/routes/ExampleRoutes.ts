import express from 'express';
import ExampleController from '../controllers/ExampleController';
import {Schemas, ValidateBody} from "../middleware/InputValidation/Joi";

const router = express.Router();

router.post('/create', ValidateBody(Schemas.example.create), ExampleController.createExample);
router.get('/get/:id', ExampleController.getExample);
router.get('/get', ExampleController.getExamples);
router.patch('/update/:id', ValidateBody(Schemas.example.update), ExampleController.updateExample);
router.delete('/delete/:id', ExampleController.deleteExample);

export = router;