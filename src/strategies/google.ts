import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import accessenv from '../config';
import { UserGoogleModel } from '../db/models/user.google.model';

passport.use(
  new GoogleStrategy(
    {
      clientID: accessenv.GOOGLE_CLIENT_ID,
      clientSecret: accessenv.GOOGLE_CLIENT_SECRET,
      callbackURL: accessenv.URL,
      scope: ['email', 'profile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userFind = await UserGoogleModel.findOne({ id: profile.id });
        if (!userFind) {
          const newUser = new UserGoogleModel({
            id: profile.id,
            email: profile.emails![0].value,
            displayName: profile.displayName,
          });
          const user = await newUser.save();
          return done(null, user);
        }

        return done(null, userFind);
      } catch (error) {
        console.log(error);
        return done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  if (user) {
    //@ts-ignore
    return done(null, user._id);
  }
  return done(null, false);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserGoogleModel.findById(id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, undefined);
  }
});
export default passport;
