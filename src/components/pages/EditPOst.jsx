import React, {useEffect, useState} from 'react'
import {Container, Post_form} from '../index'
import { useNavigate,  useParams } from 'react-router-dom';
import service from '../../appwrite/config';


function EditPOst() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <Post_form post={post} />
            </Container>
        </div>
      ) : null
}

export default EditPOst
