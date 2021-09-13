import { RequestHandler, Router } from "express";
import express from 'express'
import {createUserValidation, loginUserValidation} from "../../middleware/validators/userValidator.middlware";
import {adminController} from "../controllers/admin.controller";
import {auth} from "../../middleware/auth/auth.middleware";

export const adminRouter = Router();

adminRouter.get('/', auth.checkAdminAuth, adminController.adminDashboard);

