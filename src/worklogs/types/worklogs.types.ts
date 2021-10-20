export type Worklog = {
    task_description : string , 
    created_date : string , 
    is_edited : number,
    user_id : number
};

export type UpdateWorklog = {
    task_description:string , 
    user_id:number
};

export type createTask = ({}:Worklog) => Promise<Boolean>;
export type updateTask = ({}:UpdateWorklog) => Promise<Boolean>;