import { useProfileQuery } from "../slices/usersApiSlice"
import { useGetUserPostsQuery } from "../slices/postsApiSlice";
import { useGetIndividualPostQuery } from "../slices/postsApiSlice";
import '../index.css';
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Post = ( { id=null } ) => {
  
    const navigate = useNavigate();

    // const user = useSelector(state => state.auth.userInfo);

    // if (!user) {
    //     navigate('/');
    // }

    if (!id) {
        return <div>Loading...</div>
    }

    const { data: post, isFetching } = useGetIndividualPostQuery(id);

    const userId = post.user;
    const user = useProfileQuery(userId);
    
    if (isFetching) {
        return <div>Loading...</div>
    }

    const url = post.content;
    const src = '/api/uploads/' + url;
    const numLikes = post.likes.length;
    
    return (
        <>
            <h2>{user.username}</h2>
            <Image src={src} thumbnail style={styles.image}/>
            <h3>{numLikes} {post.caption}</h3>
        
        </>
    );
};

const styles = {
    image: {
        width: '20%',
        height: 'auto'
    }
}

export default Post;