import bodyParser from 'body-parser';
import express from 'express';
import {userRouter} from './users/routes/users.route';
import {worklogsRouter} from './worklogs/routes/worklogs.route';
import {adminRouter} from './admin/routes/admin.route';
import {createTable} from './migrations/create-table';
import cookieParser from 'cookie-parser';

const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/worklogs', worklogsRouter);
app.use('/admin', adminRouter);
app.listen(5002, ()=>{
    console.log("Listening");
});

