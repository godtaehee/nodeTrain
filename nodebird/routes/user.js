import express from 'express';

import { isLoggedIn } from './middlewares';

import User from '../models/user';
import { addFollowing } from '../controllers/user';

const router = express.Router();

router.post('/:id/follow', isLoggedIn, addFollowing);

module.exports = router;
