import { RequestHandler, Router } from "express";
import express from 'express'
import {worklogsController} from '../controllers/worklogs.controller'
import {auth} from "../../middleware/auth/auth.middleware";

export const worklogsRouter = Router()

worklogsRouter.get('/main', auth.checkAuth, worklogsController.getMain)

