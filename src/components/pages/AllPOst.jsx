import React,{useState,useEffect} from 'react';
import service from '../../appwrite/config';
import {Container,Postcard} from "../index";


function AllPOst() {
    const [post,setpost] = useState([]);
    useEffect(()=>{
        service.getAllPosts([]).then((post)=>{
            if(post){
                setpost(post.documents);
            }
        })
    },[])

  return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {post.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <Postcard {...post} />
                </div>
            ))}
        </div>
        </Container>
</div>
  )
}

export default AllPOst
