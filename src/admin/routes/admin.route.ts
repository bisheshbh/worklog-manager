import { Router } from "express";
import {adminController} from "../controllers/admin.controller";
import {auth} from "../../middleware/auth/auth.middleware";

export const adminRouter = Router();

adminRouter.get('/', auth.checkAdminAuth, adminController.adminDashboard);
adminRouter.get('/worklogs', auth.checkAdminAuth, adminController.adminWorklog)
adminRouter.get('/feedback/:id', auth.checkAdminAuth, adminController.getAddFeedback)
adminRouter.get('/users', auth.checkAdminAuth, adminController.getUsers)