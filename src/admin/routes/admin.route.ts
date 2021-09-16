import { Router } from "express";
import {adminController} from "../controllers/admin.controller";
import {auth} from "../../middleware/auth/auth.middleware";
import {createFeedbackValidation} from '../../middleware/validators/feedbackValidator'

export const adminRouter = Router();

adminRouter.get('/', auth.checkAdminAuth, adminController.adminDashboard);
adminRouter.get('/worklogs', auth.checkAdminAuth, adminController.adminWorklog)
adminRouter.get('/feedback/:id', auth.checkAdminAuth, adminController.getAddFeedback)
adminRouter.post('/feedback/:id', auth.checkAdminAuth, createFeedbackValidation ,adminController.addFeedback)

adminRouter.get('/users', auth.checkAdminAuth, adminController.getUsers)