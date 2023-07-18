import { Response } from "express";
import { RequestWithUser } from "../../types.dynamic";
import GetJwt from "../../lib/jwt";
import Password from "../../lib/password";
import GetUtils from "../../lib/utils";
import UserRepository from "../repository/userRepository";
import loginUserWithEmailAndPassword from "../../use-cases/auth-login-user";
import signupUserWithEmailAndPassword from "../../use-cases/auth-signup-user";
import TokensRepository from "../repository/tokensRepository";
import refreshAccessToken from "../../use-cases/auth-refresh-token";

interface UserControllerInput {
  userRepository: UserRepository;
  tokensRepository: TokensRepository;
  utils: GetUtils;
  jwt: GetJwt;
  password: Password;
}

export default class UserController {
  private UserRepository: UserRepository;
  private TokensRepository: TokensRepository;
  private Utils: GetUtils;
  private Jwt: GetJwt;
  private Password: Password;

  constructor(options: UserControllerInput) {
    this.Password = options.password;
    this.UserRepository = options.userRepository;
    this.TokensRepository = options.tokensRepository;
    this.Jwt = options.jwt;
    this.Utils = options.utils;
  }

  loginWithEmailAndPassword = async (req: RequestWithUser, res: Response) => {
    const { email, password } = req.body;
    const userAgent = req.headers["user-agent"];
    const userData = await loginUserWithEmailAndPassword(this.UserRepository, this.TokensRepository, this.Password, this.Jwt, this.Utils, {
      email,
      password,
      userAgent,
    });
    //...
    res.cookie("refreshToken", userData.tokens.refreshToken);
    userData.tokens.refreshToken = null;
    return userData;
  };

  signupWithEmailAndPassword = async (req: RequestWithUser, res: Response) => {
    const { email, password, name } = req.body;
    const userAgent = req.headers["user-agent"];
    const userData = await signupUserWithEmailAndPassword(this.UserRepository, this.TokensRepository, this.Password, this.Jwt, this.Utils, {
      email,
      password,
      name,
      userAgent,
    });
    //...
    res.cookie("refreshToken", userData.tokens.refreshToken);
    userData.tokens.refreshToken = null;
    return userData;
  };

  refreshAccessToken = async (req: RequestWithUser) => {
    const refreshToken = req.cookies?.refreshToken;
    return await refreshAccessToken(this.UserRepository, this.TokensRepository, this.Jwt, this.Utils, { refreshToken });
  };
}
