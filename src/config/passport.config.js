// // import passport from "passport";
// // import local from "passport-local";
// // import google from "passport-google-oauth20";
// // import jwt from "passport-jwt"
// // import { userDao } from "../dao/mongo/user.dao.js";
// // import { createHash, isValidPassword } from "../utils/hashPassword.js";
// // import { cookieExtractor } from "../utils/cookieExtractor.js";

// // import envsUtils from "../utils/envs.utils.js";

// // const LocalStrategy = local.Strategy;
// // const GoogleStrategy = local.Strategy;
// // const JWTStrategy = jwt.Strategy
// // const ExtractJWT = jwt.ExtractJwt
// // //global strategies function

// // export const initializePassport = () => {
// //   // strategy local register
// //   passport.use(
// //     "register",
// //     new LocalStrategy(
// //       { passReqToCallback: true, usernameField: "email" },
// //       async (req, username, password, done) => {
// //         console.log("hola22")
// //         // "register" is the strategy name
// //         // passreqtocallback allows us to access the request in the function
// //         // usernamefield "email" allow us to define the field that we will use as user
// //         // done is a function that we must call when we finish processing the authentication
// //         try {
// //           const { name, role } = req.body;

// //           const user = await userDao.getByEmail(username);
// //           if (user)
// //             return done(null, false, { message: "El usuario ya existe" });

// //           const newUser = {
// //             username,
// //             email: username,
// //             name,
// //             password: createHash(password),
// //             role,
// //           };

// //           const createUser = await userDao.create(newUser);

// //           done(null, createUser);
// //         } catch (error) {
// //           done(error);
// //         }
// //       }
// //     )
// //   );

// //   passport.use(
// //     "login",
// //     new LocalStrategy(
// //       { usernameField: "email" },
// //       async (username, password, done) => {
// //         try {
// //           const user = await userDao.getByEmail(username);
// //           const checkPass = isValidPassword(password, user);
// //           if (!user || !checkPass)
// //             return done(null, false, {
// //               message: "Email o contraseña invalido",
// //             });
// //           console.log;
// //           done(null, user);
// //         } catch (error) {
        
// //           done(error);
// //         }
// //       }
// //     )
// //   );

// //   //Google strategy
// //   passport.use(
// //     "google",
// //     new GoogleStrategy({
// //       clientID: "VARIABLEDEENTORNO",
// //       clientSecret: "CLIENTSECRET",
// //       callbackURL: "http://localhost:8080/api/session/google",
// //     },async(accessToken, refreshToken, profile, cb)=> {
// //         try {
// //             console.log(profile)
// //             const {name, emails } = profile
// //             const user = await userDao.getByEmail(emails[0].value)
// //             if (user) {
// //                 return cb(null, user)
// //             }
// //             const newUser = await userDao.create({
// //                 first_name: name.givenName,
// //                 last_name: name.familyName,
// //                 email: emails[0].value
// //             })
// //             return cb(null, newUser)
// //         } catch (error) {
// //             cb(error)
// //         }
// //     })
// //   );


// //   //JWT strategy
// //   passport.use("jwt", new JWTStrategy({jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey:envsUtils.JWT_SECRET},
// //       async(jwt_payload, done)=> {
// //         try {
// //           const {email} = jwt_payload
// //           const user = await userDao.getByEmail(email)
// //           done(null, user)
// //         } catch (error) {
// //           done(error)
// //         }
// //       }
// //     ))


// //   //Serialization and deserialization of User permite almacenar y recuperar información del usuario en la sesión
// //   passport.serializeUser((user, done) => {
// //     done(null, user._id);
// //   });

// //   passport.deserializeUser(async (id, done) => {
// //     try {
// //       const user = await userDao.getById(id);
// //       done(null, user);
// //     } catch (error) {
// //       done(error);
// //     }
// //   });
// // };



// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as GoogleStrategy } from "passport-google-oauth2";
// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

// import { createHashUtil, verifyHashUtil  } from "../utils/hash.util.js";
// import { createTokenUtil, verifyTokenUtil } from "../utils/token.util.js";

// import envsUtils from "../utils/envs.utils.js";
// import { userController } from "../controllers/users.controller.js";
// import UserDTO from "../dto/user.dto.js";

// // import dao from "../dao/factory.js";


// // const { UsersManager } = dao;
// // const { readByEmail, create, readById, update } = UsersManager;

// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = envsUtils;

// //--REGISTER
// passport.use(
//   "register",
//   new LocalStrategy(
//     {
//       passReqToCallback: true,
//       usernameField: "email",
//     },
//     async (req, email, password, done) => {
//       console.log("passport register")
//       try {
//         const userExists = await userController.getByEmail(email);
//         if (userExists) {
//           const info = {
//             message: "User already exists",
//             statusCode: 400,
//           };
//           return done(null, false, info);
//         }
//         req.body.password = createHashUtil(password);
//         const data = new UserDTO(req.body);
//         const user = await userController.create(data);
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );
// //--LOGIN
// passport.use(
//   "login",
//   new LocalStrategy(
//     {
//       passReqToCallback: true,
//       usernameField: "email",
//     },
//     async (req, email, password, done) => {
//       console.log("passport login")
//       try {
//         if (!email || !password) {
//           const info = {
//             message: "EMAIL AND PASSWORD ARE REQUIRED",
//             statusCode: 400,
//           };
//           return done(null, false, info);
//         }

//         const user = await userController.getByEmail(email);
//         if (!user) {
//           const info = {
//             message: "INVALID CREDENTIALS",
//             statusCode: 401,
//           };
//           return done(null, false, info);
//         }

//         const verify = verifyHashUtil(password, user.password);
//         if (!verify) {
//           const info = {
//             message: "INVALID CREDENTIALS",
//             statusCode: 401,
//           };
//           return done(null, false, info);
//         }

//         await update(user._id, { isOnline: true });
//         console.log("Usuario encontrado::::", user)
//         const data = {
//           username: user.username,
//           user_id: user._id,
//           role: user.role,
//           isOnline: true,
//         };
//         console.log("Data::::", data)
//         const token = createTokenUtil(data);
//         req.token = token;
//         return done(null, user);
//       } catch (error) {
//         console.error("Error durante el proceso de autenticación:", error);
//         return done(error);
//       }
//     }
//   )
// );
// //--ADMIN
// passport.use(
//   "admin",
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
//       secretOrKey: envsUtils.SECRET_KEY,
//     },
//     async (data, done) => {
//       try {
//         const { user_id, role } = data;
//         if (role !== "ADMIN") {
//           const info = {
//             message: "NOT AUTHORIZED",
//             statusCode: 403,
//           };
//           return done(null, false, info);
//         }
//         const user = await userController.getById(user_id);
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );
// //--GOOGLE
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
//         let user = await userController.getByEmail(id);
//         if (!user) {
//           user = await userController.create({
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
// //--SIGNOUT
// passport.use(
//   "signout",
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
//       secretOrKey: envsUtils.SECRET_KEY,
//     },
//     async (data, done) => {
//       try {
//         const { user_id } = data;
//         await update(user_id, { isOnline: false });
//         return done(null, { user_id: null });
//       } catch (error) {
//         const info = {
//           message: "Error in signout process",
//           statusCode: 500,
//         };
//         return done(null, false, info);
//       }
//     }
//   )
// );

// //--ONLINE
// passport.use(
//   "online",
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
//       secretOrKey: envsUtils.SECRET_KEY,
//     },
//     async (data, done) => {
//       try {
//         const { user_id } = data;
//         const user = await userController.getById(user_id);
//         console.log("Usuario encontrado:", user);

//         if (!user) {
//           const info = {
//             message: "USER NOT FOUND",
//             statusCode: 404,
//           };
//           return done(null, false, info);
//         }

//         const { isOnline } = user;
//         if (!isOnline) {
//           const info = {
//             message: "USER IS NOT ONLINE",
//             statusCode: 401,
//           };
//           return done(null, false, info);
//         }

//         return done(null, user);
//       } catch (error) {
//         const info = {
//           message: "Error in JWT strategy",
//           statusCode: 500,
//         };
//         return done(null, false, info);
//       }
//     }
//   )
// );
// //--ONLINE LOCALSTRATEGY (NO LO UTILIZO)
// passport.use(
//   "onlineLocalStrategy",
//   new LocalStrategy(
//     {
//       passReqToCallback: true,
//       usernameField: "email",
//       passwordField: "pasword",
//     },
//     async (req, email, password, done) => {
//       try {
//         const token = req.token;
//         const { user_id } = verifyTokenUtil(token);
//         const user = await userController.getById(user_id);
//         const { isOnline } = user;
//         if (!isOnline) {
//           const info = {
//             message: "User is not online",
//             statusCode: 401,
//           };
//           return done(null, false, info);
//         }
//         return done(null, user);
//       } catch (error) {
//         const info = {
//           message: "Error in online verification",
//           statusCode: 500,
//         };
//         return done(null, false, info);
//       }
//     }
//   )
// );

// export default passport;
