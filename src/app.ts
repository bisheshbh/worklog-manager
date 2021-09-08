import express from 'express';
import userRoutes from './users/controllers/users.controllers'

const app = express()
app.set('view engine', 'ejs')
app.use('/users', userRoutes)
app.listen(3000);

