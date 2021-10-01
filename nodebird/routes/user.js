import express from 'express';

import { isLoggedIn } from '../../nodebird-api/routes/middlewares';

import User from '../models/user';

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
