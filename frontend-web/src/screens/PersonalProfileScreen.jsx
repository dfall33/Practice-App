import Post from "../components/Post";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProfileQuery } from "../slices/usersApiSlice";
import PostContainer from "../components/PostContainer";

const PersonalProfileScreen = () => {

    const navigate = useNavigate();
    const userInfo = useSelector(state => state.auth.userInfo);
    
    useEffect( () => {
        if (!userInfo) {
            navigate('/login');
        }
    })

    const {data: profile, error, isLoading} = useProfileQuery(userInfo.username);
    

    if (isLoading) {
        return <div>Loading...</div>
    }
    console.log(`In PersonalProfileScreen: ${userInfo}`);
    console.dir(userInfo)
    console.dir(profile.posts)

    return (
        <div>
            {/* <Post /> */}
            <h1> {profile.name} </h1>
            <p> {profile.bio} </p>
            <p> {profile.username} </p>
            <PostContainer posts={profile.posts} />
            
        </div>
    )
}

export default PersonalProfileScreen;