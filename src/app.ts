import bodyParser from 'body-parser';
import express from 'express';
import userRoutes from './users/controllers/users.controllers'

const app = express()
app.set('view engine', 'ejs')
app.use('/users', userRoutes)
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);

