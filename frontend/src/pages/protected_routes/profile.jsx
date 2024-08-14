
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { toast } from "react-toastify";
import { getUserProfileApi } from "../../apis/Apis";
// import "../../css/profile.css";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    // const [previewProfileImage, setPreviewProfileImage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Token not found. Please log in.");
            setLoading(false);
            return;
        }

        const userId = decodeTokenAndGetUserId(token);
        if (!userId) {
            toast.error("Unable to verify your identity. Please log in again.");
            setLoading(false);
            return;
        }

        getUserProfileApi(userId)
            .then((res) => {
                if (res.data.success === true) {
                    setUserData(res.data.userProfile);
                    console.log("User ID:", res.data);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Error fetching user profile");
            })
            .finally(() => {
                setLoading(false);
            });
        console.log("User ID:", userData?._id);
    }, []);

    const decodeTokenAndGetUserId = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.id;
        } catch (error) {
            console.error("Error decoding token:", error.message);
            return null;
        }
    };

    // const handleProfileImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     setProfileImage(file);
    //     setPreviewProfileImage(URL.createObjectURL(file));
    // };   

    return (
        <div className="d-flex flex-column align-items-center justify-content-center profile-page-container">
            <h2 className="mb-2">Welcome to Your Profile, {userData?.firstName}</h2>
            {loading ? (
                <p className="loading-text">Loading user data...</p>
            ) : userData ? (
                <div className="d-flex flex-column align-items-center justify-content-center profile-details-container mt-5 shadow-lg">
                    <div className="old-image-box mx-5 p-5 ">
                        {userData.profileImage ? (
                            <img
                                src={userData.profileImage}
                                alt="Old Profile Image"
                                className="old-profile-image rounded-circle shadow-lg"
                                style={{ objectFit: "cover", maxWidth: 200, maxHeight: 200 }}
                            />
                        ) : (
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg"
                                alt="Default Image"
                                className="old-profile-image rounded-circle"
                                style={{ objectFit: "cover", maxWidth: 300, maxHeight: 300 }}
                            />
                        )}
                    </div>



                    <div className="profile-details border-top ">
                        <p className="mt-3">
                            <strong>First Name:</strong> {userData.firstName}
                        </p>
                        <p>
                            <strong>Last Name:</strong> {userData.lastName}
                        </p>
                        <p>
                            <strong>Contact Number:</strong> {userData.contact}
                        </p>
                        <p>
                            <strong>Address:</strong> {userData.location}
                        </p>
                        <p>
                            <strong>Email:</strong> {userData.email}
                        </p>
                    </div>
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt="Profile Preview"
                            className="profile-image-preview rounded-circle"
                            style={{ objectFit: "cover", maxWidth: 300, maxHeight: 300 }}
                        />
                    )}
                    <Link className="mb-2" to={`/profile/edit/${userData.id}`}>
                        <button className="btn btn-lightbtn btn-outline-dark">Edit Profile</button>
                    </Link>
                </div>
            ) : (
                <p className="error-text">
                    Unable to fetch user data. Please try again later.
                </p>
            )}
        </div>
    );
};

export default Profile;


