import bodyParser from 'body-parser';
import express from 'express';
import userRoutes from './users/controllers/users.controllers'
import 'cookie-parser'
import cookieParser from 'cookie-parser';

const app = express()
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use('/users', userRoutes)
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);

