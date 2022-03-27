import express from 'express';
import ExampleController from '../controllers/ExampleController';
import {Schemas, ValidateJoi} from "../middleware/InputValidation/Joi";

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.example.create), ExampleController.createExample);
router.get('/get/:id', ExampleController.getExample);
router.get('/get', ExampleController.getExamples);
router.patch('/update/:id', ValidateJoi(Schemas.example.update), ExampleController.updateExample);
router.delete('/delete/:id', ExampleController.deleteExample);

export = router;