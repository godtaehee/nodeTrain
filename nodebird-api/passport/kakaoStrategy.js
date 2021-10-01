import passport from 'passport';
import KakaoStrategy from 'passport-kakao';

import User from '../models/user';
const kakaoStrategy = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            });
            done(null, newUser);
          }
        } catch (e) {
          console.error(e);
          done(e);
        }
      }
    )
  );
};

export default kakaoStrategy;
