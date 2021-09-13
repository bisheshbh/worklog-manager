export type User = {
    username : string ,
    email : string , 
    password : string,
    date_of_birth:string , 
    address:string , 
    isAdmin:number, 
    departmentName:string
}

export type createUser = ({}:User) => Promise<Boolean>
