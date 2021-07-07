const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const { JWT_SECRET } = require("../config/keys");
// check if the user with this user name exist and if the password match
// username and password in attributes are from front end
exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    //go to user model and check if there is field called username:username from attributes(FE) then return this obj.
    const user = await User.findOne({
      where: { username: username },
    });
    //after fetch this user i will use user.password to compare it with password from front end.
    const passwordsMatch = user
      ? //it hash password that come from Fe then compare it with user.password that it's already hash when we sign up.
        await bcrypt.compare(password, user.password)
      : false;
    //if done (null,user) it will store user in req.user that i used in controller.
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
    //in 37 first i tell him that i pass token in header through bearer and if i forget to pass it from it will give me 401.
    //in 38 first i tell him that inside my token the secretOrKey must be"asupersecretkey" if wrong return 401

    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: "asupersecretkey",
  },
  //if 39 and 40 true go here
  async (payload, done) => {
    if (Date.now() > payload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(payload.id);
      //if done (null,user(and user not false) go to controller and save user in req.user(one request only that you put this middle ware before it))
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
