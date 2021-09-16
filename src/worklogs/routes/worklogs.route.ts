import { RequestHandler, Router } from "express";
import {worklogsController} from '../controllers/worklogs.controller';
import {auth} from "../../middleware/auth/auth.middleware";
import { createTaskValidation } from "../../middleware/validators/taskValidator.middleware";

export const worklogsRouter = Router();

worklogsRouter.get('/main', auth.checkAuth, worklogsController.getMain);
worklogsRouter.get('/create', auth.checkAuth, worklogsController.getCreateTask);
worklogsRouter.post('/create',  auth.checkAuth, createTaskValidation, worklogsController.createTask);
