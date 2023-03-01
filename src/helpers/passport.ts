import passportJWT from "passport-jwt";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;

const { ExtractJwt, Strategy } = passportJWT;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new Strategy(params, async (payload, done) => {
  await User.find({ _id: payload._id })
    .then(([user]) => {
      if (!user) {
        return done(new Error("User not found"));
      }
      return done(null, user);
    })
    .catch((err) => done(err));
});

export default strategy;
