import { useProfileQuery } from "../slices/usersApiSlice"
import { useGetUserPostsQuery } from "../slices/postsApiSlice";
import { useGetIndividualPostQuery } from "../slices/postsApiSlice";
import '../index.css';

const Post = ( { id='none' }) => {
    
    const { data: post } = useGetIndividualPostQuery(id);
    const url = post ? post.content : 'https://via.placeholder.com/150';

    return (
        <div>
            <img src={url} alt="x" className="post-styles"/>
        </div>
    )
}

export default Post;