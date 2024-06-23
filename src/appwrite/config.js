import conf from "../conf/conf";
import { Client, Account, ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    Databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.projectID);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    } 
// create post 
    async createPost({title,slug,content,image,status,userID}){
        try {
            return await this.databases.createDocument(
                conf.Dbid,
                conf.collectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userID,
                }
            )
        } catch (error) {
            console.log("error");
        }
    }

// update post 
async updatePost(slug,{title,content,image,status,userID}){
    try {
        return await this.databases.updateDocument(
            conf.Dbid,
            conf.collectionID,
            slug,
            {
                content,title,status,
                image
            }

        )
        
    } catch (error) {
        
    }
}

//delete post 
async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.Dbid,
            conf.collectionID,
            slug 
        )
        return true;
    } catch (error) {
        console.log("error in delete ",error);
        return false;
    }
}

//get single post
async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.Dbid,
            conf.collectionID,
            slug
        )
    } catch (error) {
        
    }
}

// get all post
async getAllPosts(queries=[Query.equal("status","active")]){
    try {
        this.databases.listDocuments(
            conf.Dbid,
            conf.collectionID,
            queries,
            // [
            //     Query.equal("status","active")
            // ]
        )
    } catch (error) {
         console.log("eeror in geting doc",error);
    }
    

}
//uplaod file 
async uploadFile(file){
    try {
        this.bucket.createFile(
            conf.BucketID,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("upload error",error);
    }
}

// delete file 
async deleteFile(fileID){
    try {
        this.bucket,this.deleteFile(
            conf.BucketID,
            fileID
        )
        return true;
        
    } catch (error) {
        console.log("file delete error",error);
        return false;
        
    }
}

// file preview

getFilePreview(fileID){
    return this.bucket.getFilePreview(
        conf.BucketID,
        fileID
    )
}

}

const service = new Service();
export default service;