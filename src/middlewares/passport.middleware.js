import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
//mport { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { createHashUtil, verifyHashUtil  } from "../utils/hash.util.js";
import { createTokenUtil, verifyTokenUtil } from "../utils/token.util.js";

import envsUtils from "../utils/envs.utils.js";
// import { userController } from "../controllers/users.controller.js";
import UserDTO from "../dto/user.dto.js";

import userServices from "../services/users.services.js";

// import dao from "../dao/factory.js";


// const { UsersManager } = dao;
// const { readByEmail, create, readById, update } = UsersManager;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = envsUtils;

//--REGISTER
passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        const userExists = await userServices.getByEmail(email);
 
        if (userExists) {
          const info = {
            message: "User already exists",
            statusCode: 400,
          };
          return done(null, false, info);
        }
        req.body.password = createHashUtil(password);
        const data = new UserDTO(req.body);
        const user = await userServices.create(data);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
//--LOGIN
passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const info = {
            message: "EMAIL AND PASSWORD ARE REQUIRED",
            statusCode: 400,
          };
          return done(null, false, info);
        }
        const user = await userServices.getByEmail(email);
          
        if (!user) {
          const info = {
            message: "INVALID CREDENTIALS1",
            statusCode: 401,
          };
          return done(null, false, info);
        }

        const verify = verifyHashUtil(password, user.password);
        if (!verify) {
          const info = {
            message: "INVALID CREDENTIALS2",
            statusCode: 401,
          };
          return done(null, false, info);
        }

        await userServices.update(user._id, { isOnline: true });
        const data = {
          firstName: user.firstname,
          username: user.username,
          user_id: user._id,
          role: user.role,
          isOnline: true,
          mode: user.mode,
        };
        const token = createTokenUtil(data);
        req.token = token;        
        return done(null, user);
      } catch (error) {
        console.error("Error durante el proceso de autenticación:", error);
        return done(error);
      }
    }
  )
);
//--ADMIN
passport.use(
  "admin",
  new JwtStrategy(
    {
      // jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envsUtils.SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { user_id, role } = data;
        if (role !== "ADMIN") {
          const info = {
            message: "NOT AUTHORIZED",
            statusCode: 403,
          };
          return done(null, false, info);
        }
        const user = await userServices.getById(user_id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//--SIGNOUT
passport.use(
  "signout",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: envsUtils.SECRET_KEY,
    },
    async (data, done) => {
      try {     
        const { user_id } = data;
        await userServices.update(user_id, { isOnline: false });
        return done(null, { user_id: null });
      } catch (error) {
        const info = {
          message: "Error in signout process",
          statusCode: 500,
        };
        return done(null, false, info);
      }
    }
  )
);

//--ONLINE
passport.use(
  "online",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: envsUtils.SECRET_KEY,
    },
    async (data, done) => {
      console.log("🚀 ~ data:", data)
      try {

        const { user_id } = data;
        const user = await userServices.getById(user_id);
        console.log("Usuario encontrado:", user);

        if (!user) {
          const info = {
            message: "USER NOT FOUND",
            statusCode: 404,
          };
          return done(null, false, info);
        }

        const { isOnline } = user;
        if (!isOnline) {
          const info = {
            message: "USER IS NOT ONLINE",
            statusCode: 401,
          };
          return done(null, false, info);
        }
        
        const userData = {
          firstName: user.firstname,
          username: user.username,
          user_id: user._id,
          role: user.role,
          isOnline: user.isOnline,
          mode: user.mode,
          email: user.email};

        console.log("Usuario en línea:", userData);
        return done(null, userData);
      } catch (error) {
        const info = {
          message: "Error in JWT strategy",
          statusCode: 500,
        };
        return done(null, false, info);
      }
    }
  )
);

//--ONLINE LOCALSTRATEGY (NO LO UTILIZO)
passport.use(
  "onlineLocalStrategy",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "pasword",
    },
    async (req, email, password, done) => {
      try {
        const token = req.token;
        const { user_id } = verifyTokenUtil(token);
        const user = await userServices.getById(user_id);
        const { isOnline } = user;
        if (!isOnline) {
          const info = {
            message: "User is not online",
            statusCode: 401,
          };
          return done(null, false, info);
        }
        return done(null, user);
      } catch (error) {
        const info = {
          message: "Error in online verification",
          statusCode: 500,
        };
        return done(null, false, info);
      }
    }
  )
);

//--GOOGLE
// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       passReqToCallback: true,
//       callbackURL: BASE_URL + "sessions/google/cb",
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         const { id, picture } = profile;
//         let user = await userServices.getByEmail(id);
//         if (!user) {
//           user = await userServices.create({
//             email: id,
//             photo: picture,
//             password: createHashUtil(id),
//           });
//         }
//         req.token = createTokenUtil({ role: user.role, user: user._id });
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );


export default passport;
