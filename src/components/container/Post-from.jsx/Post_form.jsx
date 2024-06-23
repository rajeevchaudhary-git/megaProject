import React,{useCallback} from 'react'
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service  from '../../../appwrite/config';
import {Button,Input,Select,TineMceEditor} from "../../index";
// import authServices from '../../../appwrite/auth';
console.log(service);

function Post_form({ post }) {
 const {register,handleSubmit,watch,setvalue,control,getvalues}= useForm({
    defaultValues:{
        title:post?.title || '',
        slug:post?.slug || '',
        content:post?.content || '',
        status:post?.status || 'active',
    },
 })

 const navigate = useNavigate();
 const Userdata = useSelector(state=>state.user.Userdata);

 const submit = async (data)=>{
    if(post){
        const file = data.image[0] ? service.uploadFile(data.image[0]):null
    }
    if(file){
        service.deleteFile(post.image);
    }
    const dbPost = await service.updatePost(post.$id,{
        ...data,
        image:file? file.$id:undefined,
    });
    if(dbPost){
        navigate(`/post/${dbPost.$id}`);
    }
    else{
        const file = await service.uploadFile(data.image[0]);
        if(file){
            const fieldId = file.$id;
            await service.createPost({
                ...data,
                userid: userID.$id,

            });
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }
    }
 }

 const slugTransform = useCallback((value)=>{
    if(value && typeof value=='string'){
        // const slug = value.toLowerCase().replace(/^[a-zA-Z\d\s]+/g, '-')
        // .replace(/\s/g, '-')
        // setvalue('slug',slug);
        // return slug;
        return value.trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
    return "";
 },[])

 React.useEffect(()=>{
 const subscription = watch((value,{name})=>{
    if(name=='title'){
        setvalue('slug',slugTransform(value.title,
            {shouldValidate:true}
        ));
    }
 });
 return ()=>{
    subscription.unsubscribe();
 }
 },[watch,slugTransform,setvalue])
 return(
    <>
 <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setvalue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </>
 )
}

export default Post_form
