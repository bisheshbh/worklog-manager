import { Router } from "express";
import {adminController} from "../controllers/admin.controller";
import {auth} from "../../middleware/auth/auth.middleware";
import {createFeedbackValidation} from '../../middleware/validators/feedbackValidator'
import { updateUserValidation } from "../../middleware/validators/userValidator.middlware";

export const adminRouter = Router();

adminRouter.get('/', auth.checkAdminAuth, adminController.adminDashboard);
adminRouter.get('/worklogs', auth.checkAdminAuth, adminController.adminWorklog);
adminRouter.get('/feedback/:id', auth.checkAdminAuth, adminController.getAddFeedback);
adminRouter.post('/feedback/:id', auth.checkAdminAuth, createFeedbackValidation ,adminController.addFeedback);
adminRouter.get('/users', auth.checkAdminAuth, adminController.getUsers);
adminRouter.get('/update-user/:id', auth.checkAdminAuth, adminController.getUpdateUser);
adminRouter.post('/update-user/:id', auth.checkAdminAuth, updateUserValidation,adminController.updateUser);
adminRouter.get('/delete/:id', auth.checkAdminAuth, adminController.deleteUpdate);
