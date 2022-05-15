import express from 'express';
import {Schemas, ValidateBody} from "../middleware/InputValidation/Joi";
import MatchHistoryController from "../controllers/MatchHistoryController";
import {checkJwt} from "../middleware/oAuth.js";

const router = express.Router();

router.post('/solo', ValidateBody(Schemas.matchHistory.create), checkJwt, MatchHistoryController.createMatchHistory);
// router.get('/get/:id', MatchHistoryController.getMatchHistory);
// router.get('/get', MatchHistoryController.getMatchHistories);

export = router;