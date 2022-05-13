import express from 'express';
import AvatatController from '../controllers/AvatarController';

const router = express.Router();

router.get('/', AvatatController.getRandomAvatar);
router.post('/', AvatatController.createAvatar);

export = router;