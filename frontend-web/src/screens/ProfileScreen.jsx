import Post from "../components/Post";
import { useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";
import { useProfileQuery } from "../slices/usersApiSlice";
import PostContainer from "../components/PostContainer";
import { useGetUserPostsQuery } from "../slices/postsApiSlice";

const ProfileScreen = () => {

    const navigate = useNavigate();
    const userInfo = useSelector(state => state.auth.userInfo);
    const { username } = useParams();
    
    // useEffect( () => {
    //     if (!userInfo) {
    //         navigate('/login');
    //     }
    // })

    // const {data: profile, error, isLoading} = useProfileQuery(userInfo.username);
    const { data: user, error, isLoading } = useGetUserPostsQuery(username);
    // const numFollowing = user.following.length;
    console.log('user')
    console.dir(user)
    // const numFollowers = user.followers.length;

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <div>User not found.</div>
    }

    console.log('posts')
    console.dir(user.posts)
    return (
        <div>
            {/* <Post /> */}
            <h1>Profile</h1>
            <PostContainer posts={user.posts} />
            
        </div>
    )
}

export default ProfileScreen;