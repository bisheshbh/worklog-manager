import bodyParser from 'body-parser';
import express from 'express';
import userRoutes from './users/routes/users.route'
import worklogRoutes from './worklogs/routes/worklogs.route'
import adminRoutes from './admin/routes/admin.route'
import {c} from './migrations/create-table'
import 'cookie-parser'
import cookieParser from 'cookie-parser';
import adminController from './admin/controllers/admin.controller';
import department from './department/models/department.models'
import { departments } from './department/data/department.data';


const app = express()
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/db/migrate', (req , res)=>{
    // c.createTable()
    // department.insertData()
    department.getDepartmentData()
    res.send("Done")
})
app.use('/users', userRoutes)
app.use('/worklogs', worklogRoutes)
app.use('/admin', adminRoutes)
app.listen(5002, ()=>{
    console.log("Listening")
});

