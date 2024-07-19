import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const PostContainer = ({ posts }) => {

    return (
            <div className="profile-container">
                
                <div className="posts-grid">
                    {posts.map((post) => (
                        <div key={post._id} className="post-item">
                        <LinkContainer to={`/posts/${post._id}`}>
                            <img src={`/api/uploads/${post.content}`} alt={post.caption}/>
                        </LinkContainer>
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default PostContainer;