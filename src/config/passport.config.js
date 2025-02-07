import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import jwt from "passport-jwt"
import { userDao } from "../dao/mongo/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
//global strategies function

export const initializePassport = () => {
  // strategy local register
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        // "register" is the strategy name
        // passreqtocallback allows us to access the request in the function
        // usernamefield "email" allow us to define the field that we will use as user
        // done is a function that we must call when we finish processing the authentication

        try {
          const { name, role } = req.body;

          const user = await userDao.getByEmail(username);
          if (user)
            return done(null, false, { message: "El usuario ya existe" });

          const newUser = {
            username,
            email: username,
            name,
            password: createHash(password),
            role,
          };

          const createUser = await userDao.create(newUser);

          done(null, createUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userDao.getByEmail(username);
          const checkPass = isValidPassword(password, user);
          if (!user || !checkPass)
            return done(null, false, {
              message: "Email o contraseña invalido",
            });
          console.log;
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //Google strategy
  passport.use(
    "google",
    new GoogleStrategy({
      clientID: "VARIABLEDEENTORNO",
      clientSecret: "CLIENTSECRET",
      callbackURL: "http://localhost:8080/api/session/google",
    },async(accessToken, refreshToken, profile, cb)=> {
        try {
            console.log(profile)
            const {name, emails } = profile
            const user = await userDao.getByEmail(emails[0].value)
            if (user) {
                return cb(null, user)
            }
            const newUser = await userDao.create({
                first_name: name.givenName,
                last_name: name.familyName,
                email: emails[0].value
            })
            return cb(null, newUser)
        } catch (error) {
            cb(error)
        }
    })
  );


  //JWT strategy
  passport.use("jwt", new JWTStrategy({jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey:"CODIGOSECRETO"},
      async(jwt_payload, done)=> {
        try {
          const {email} = jwt_payload
          const user = await userDao.getByEmail(email)
          done(null, user)
        } catch (error) {
          done(error)
        }
      }
    ))


  //Serialization and deserialization of User permite almacenar y recuperar información del usuario en la sesión
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDao.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
