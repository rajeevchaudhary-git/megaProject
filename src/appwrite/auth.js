import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client  = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.projectID);
        this.account = new Account(this.client);

    }

    async  createAccount({email,password,name="blogapp"}){
        try{
          const UserAccount= await this.account.create(ID.unique(),email,password,name)
           if(UserAccount){
            // return UserAccount;
            // call another method
            return this.login({email,password});
           }

           else{
            return UserAccount;
           }

        }catch(error){
            throw error;
        }
    }

    // login method 

    async login({email,password}){
        try {
            await this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            throw error;
        }
    }


    // get current user 

    async getCurrentUser(){
        try {
            await this.account.get();
        } catch (error) {
            throw error;
            
        }
        return null;
    }


    // log out user 
    async logout(){
        try {
            await this.account.deleteSessions('current');
        } catch (error) {
            throw error;
            
        }
    }

}

const authServices = new AuthService();
export default authServices;