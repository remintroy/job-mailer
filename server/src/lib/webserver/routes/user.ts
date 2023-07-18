import ExpressApp, { Router } from "express";
import getConfig from "../../../config";
import UserController from "../../../adaptor/controllers/user";
import GetJwt from "../../jwt";
import Password from "../../password";
import UserRepositoryImpl from "../../mongodb/repositorys/userRepositoryImpl";
import GetUtils from "../../utils";
import makeExpressCallback from "../middlewares/makeExpressCallback";
import createAuthInit from "../middlewares/authInit";
import TokensRepositoryImpl from "../../mongodb/repositorys/tokensRepositoryImpl";

export default function UserRouterV1(express: typeof ExpressApp): Router {
  const router = express.Router();
  const config = getConfig();
  const utils = new GetUtils();
  const userRepository = new UserRepositoryImpl();
  const tokensRepository = new TokensRepositoryImpl();
  const passwordService = new Password({ salt: config.auth.salt });
  const jwtService = new GetJwt({
    accessTokenSecret: config.jwt.user.accessSecret,
    accessTokenOptions: config.jwt.user.accessOptions,
    refreshTokenSecret: config.jwt.user.refreshSecret,
    refreshTokenOptions: config.jwt.user.refreshOptions,
  });

  const controller = new UserController({
    jwt: jwtService,
    password: passwordService,
    tokensRepository: tokensRepository,
    userRepository: userRepository,
    utils: utils,
  });

  // Authentication
  router.use(createAuthInit({ userJwt: jwtService }));
  //...
  router.route("/auth/login").post(makeExpressCallback(controller.loginWithEmailAndPassword));
  router.route("/auth/signup").post(makeExpressCallback(controller.signupWithEmailAndPassword));
  router.route("/auth/refresh").get(makeExpressCallback(controller.refreshAccessToken));

  return router;
}
