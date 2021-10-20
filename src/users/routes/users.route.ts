import { RequestHandler, Router } from "express";
import { auth } from "../../middleware/auth/auth.middleware";
import {createUserValidation, loginUserValidation, updatePasswordValidation} from "../../middleware/validators/userValidator.middlware";
import {usersController} from "../controllers/users.controllers";

export const userRouter = Router();

userRouter.get('/register', usersController.getRegister);
userRouter.post('/register', createUserValidation, usersController.register);
userRouter.get('/login', usersController.getLogin);
userRouter.post('/login', loginUserValidation, usersController.login);
userRouter.get('/profile', auth.checkAuth , usersController.getProfile);
userRouter.get('/settings', auth.checkAuth, usersController.getSettings);
userRouter.post('/change-department', auth.checkAuth, usersController.updateDepartment)
userRouter.post('/change-password', auth.checkAuth, updatePasswordValidation , usersController.updatePassword)
userRouter.get('/logout', usersController.logout);

