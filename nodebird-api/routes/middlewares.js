import jwt from 'jsonwebtoken';
import RateLimit from 'express-rate-limit';

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    console.log(req.isAuthenticated());
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};

const verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    return res.status(401).json({
      code: 419,
      message: '토큰이 만료되었습니다.',
    });
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    });
  }
};

const apiLimiter = new RateLimit({
  windowMs: 5 * 1000,
  max: 1,
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: '5초에 한번만 요청할수 있습니다.',
    });
  },
});

const deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요',
  });
};

export { isLoggedIn, isNotLoggedIn, verifyToken, apiLimiter, deprecated };
