import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../models/user";

/**
 * Controller sử dụng cho việc xác thực Jwt
 * - JWT_SECRET recommend to use all kinds of characters and to have the length of at least 25
 * - It’s very important not to repeat this hash among your projects, as it has to be something unique and secure, because this is what is used for generating and comparing the token
 * Ref: https://www.lastpass.com/password-generator
 */
class AuthController {
  constructor() {

  }

  private getStrategy(): Strategy {

  }

  initialize() {
    passport.use('jwt', this.get)
  }


}
