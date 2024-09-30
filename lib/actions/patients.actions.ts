import { ID, Query } from "node-appwrite"
import { Users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async (user: CreateUserParams) => {
    console.log("Start Debugging");
    
    try {
        const newUser = await Users.create(
            ID.unique(), 
            user.email, 
            user.phone, 
            undefined,
            user.name
        )
        console.log("Hello " + {newUser})

        return parseStringify(newUser);
        
    } catch (error: any) {
        if(error && error?.code === 409){
            const documents = await Users.list([
                Query.equal('email', [user.email])
            ])
            return documents?.users[0]
        }else{
            console.log(error);
            
        }
    }
}
export const getUser = async(userId: string)=>{
    try {
        const user = await Users.get(userId);

        return parseStringify(user)
    } catch (error) {
        console.log(error);
        
    }
}