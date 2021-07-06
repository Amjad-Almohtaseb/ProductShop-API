const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const JWT_SECRET = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username: username },
    });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    return done(null, passwordsMatch ? user : false);
    /*
            if(passwordsMatch){
                        return done(null, user)
                } else {

                    return done({status:401, message: "Incorrect Username or Password"})
                }
       */
  } catch (error) {
    done(error);
  }
});
exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: "asupersecretkey",
  },
  async (payload, done) => {
    if (Date.now() > payload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(payload.id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
