import { RequestHandler, Router } from "express";
import express from 'express'
import worklogsController from '../controllers/worklogs.controller'
import auth from "../../middleware/auth/auth.middleware";

const router = Router()

router.get('/main', auth.checkAuth, worklogsController.getMain)

export default router;