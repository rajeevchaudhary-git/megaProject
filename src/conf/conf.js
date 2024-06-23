const conf ={
appwriteurl:String(import.meta.env.VITE_APPWRITE_URL),
projectID:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
Dbid:String(import.meta.env.VITE_APPWRITE_DB_ID),
collectionID:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
BucketID:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}
export default conf;