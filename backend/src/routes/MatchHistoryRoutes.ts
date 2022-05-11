import express from 'express';
import {Schemas, ValidateBody} from "../middleware/InputValidation/Joi";
import MatchHistoryController from "../controllers/MatchHistoryController";

const router = express.Router();

router.post('/create', ValidateBody(Schemas.matchHistory.create), MatchHistoryController.createMatchHistory);
router.get('/get/:id', MatchHistoryController.getMatchHistory);
router.get('/get', MatchHistoryController.getMatchHistories);

export = router;