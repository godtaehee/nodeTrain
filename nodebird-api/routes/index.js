import express from 'express';
import { v4 } from 'uuid';
import User from '../models/user';
import Domain from '../models/domain';
import { isLoggedIn } from './middlewares';

const router = express.Router();
const uuidv4 = v4;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: (req.user && req.user.id) || null },
      include: { model: Domain },
    });
    res.render('login', {
      user,
      domains: user && user.Domains,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/domain', isLoggedIn, async (req, res, next) => {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: uuidv4(),
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
