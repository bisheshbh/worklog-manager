import { RequestHandler, Router } from "express";
import {createUserValidation, loginUserValidation} from "../../middleware/validators/userValidator.middlware";
import {usersController} from "../controllers/users.controllers";

export const userRouter = Router();

userRouter.get('/register', usersController.getRegister);
userRouter.post('/register', createUserValidation, usersController.register);
userRouter.get('/login', usersController.getLogin);
userRouter.post('/login', loginUserValidation, usersController.login);
userRouter.get('/logout', usersController.logout);

