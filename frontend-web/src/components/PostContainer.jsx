const PostContainer = ({ posts }) => {
    return (
            <div className="profile-container">
                
                <div className="posts-grid">
                    {posts.map((post) => (
                        <div key={post._id} className="post-item">
                            <img src={post.content} alt={post.caption} />
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default PostContainer;