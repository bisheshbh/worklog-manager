import { RequestHandler, response, Router } from "express";
import express from 'express'
import bodyParser from "body-parser";


class WorklogsController {

    getMain : RequestHandler = async(req:express.Request, res:express.Response, next:express.NextFunction) => {
        res.send("Success")
    }

}

let worklogsController = new WorklogsController()
export default worklogsController;