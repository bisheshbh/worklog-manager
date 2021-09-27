import { RequestHandler, Router } from "express";
import {worklogsController} from '../controllers/worklogs.controller';
import {auth} from "../../middleware/auth/auth.middleware";
import { createTaskValidation } from "../../middleware/validators/taskValidator.middleware";
import { worklogsModel } from "../models/worklogs.model";

export const worklogsRouter = Router();

worklogsRouter.get('/main', auth.checkAuth, worklogsController.getMain);
worklogsRouter.get('/create', auth.checkAuth, worklogsController.getCreateTask);
worklogsRouter.post('/create',  auth.checkAuth, createTaskValidation, worklogsController.createTask);
worklogsRouter.get('/update/:id', auth.checkAuth, worklogsController.getUpdateTask);
worklogsRouter.post('/update/:id', auth.checkAuth, createTaskValidation ,worklogsController.updateTask);
worklogsRouter.get('/allupdates', auth.checkAuth, worklogsController.getWorklogs);