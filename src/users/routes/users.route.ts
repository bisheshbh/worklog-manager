import { RequestHandler, Router } from "express";
import express from 'express'
import {createUserValidation, loginUserValidation} from "../../middleware/validators/userValidator.middlware";
import usersController from "../controllers/users.controllers";

const router = Router()

router.get('/register', usersController.getRegister)
router.post('/register', createUserValidation, usersController.register);
router.get('/login', usersController.getLogin)
router.post('/login', loginUserValidation, usersController.login)
router.get('/logout', usersController.logout)

export default router;