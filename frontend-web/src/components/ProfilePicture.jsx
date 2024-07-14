const ProfilePicture = ({ user }) => {
    return (
        <div>
            <img src={user.profilePicture} alt={user.username} className="border-radius-50"/>
        </div>
    )
}