import { Router } from "express";
import {adminController} from "../controllers/admin.controller";
import {auth} from "../../middleware/auth/auth.middleware";

export const adminRouter = Router();

adminRouter.get('/', auth.checkAdminAuth, adminController.adminDashboard);

