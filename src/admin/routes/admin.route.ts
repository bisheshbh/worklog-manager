import { RequestHandler, Router } from "express";
import express from 'express'
import {createUserValidation, loginUserValidation} from "../../middleware/validators/userValidator.middlware";
import adminController from "../controllers/admin.controller";
import auth from "../../middleware/auth/auth.middleware";


const router = Router();

router.get('/', auth.checkAdminAuth, adminController.adminDashboard);

export default router;