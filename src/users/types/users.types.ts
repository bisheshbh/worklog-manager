export type User = {
    id:number,
    username : string ,
    email : string , 
    password : string,
    date_of_birth:string , 
    address:string , 
    isAdmin:number, 
    department:number
};

export type createUser = ({}:User) => void;
