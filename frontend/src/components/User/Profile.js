import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  console.log(user);

  return (
    <>
      {loading ? (
        <ReactLoading type="bubbles" color="orange" height={300} width={250} />
      ) : (
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img src={user.profile_pic.url} alt={user.name} />
            <Link to="/me/update">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
            </div>

            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
