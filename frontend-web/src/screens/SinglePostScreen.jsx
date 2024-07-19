import { useSelector } from "react-redux";
import { useGetIndividualPostQuery } from "../slices/postsApiSlice";
import Post from "../components/Post";
import { Image, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../slices/postsApiSlice";

const SinglePostScreen = () => {
    
    const userInfo = useSelector(state => state.auth.userInfo);

    const navigate = useNavigate();

    const { id } = useParams();
    const { data: post, isFetching } = useGetIndividualPostQuery(id);

    const [ deletePost ] = useDeletePostMutation();
    
    if (isFetching) {
        return <div>Loading...</div>
    }

    const clickHandler = () => {
        deletePost(id);
    }

    console.log(`same: ${userInfo._id === post.user}, ${userInfo._id}, ${post.user}`);

    
    return (
        <>

            {
                userInfo && userInfo._id === post.user && (
                    
                <>
                        <Button onClick={clickHandler}>Delete</Button>
                
                </>

                )

            }
            <Post id={id} />
        </>
    );
};

const styles = {
    image: {
        width: '20%',
        height: 'auto'
    }
}

export default SinglePostScreen;