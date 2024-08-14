
import React, { useState } from "react";
import { toast } from "react-toastify";
import { changePasswordApi } from "../apis/Apis";
// import "../css/sendemailstyle.css";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Validate passwords
            if (newPassword === currentPassword) {
                throw new Error("New password should be different from the current password.");
            }

            if (newPassword !== confirmNewPassword) {
                throw new Error("New password and confirmation password do not match.");
            }

            // Make API call to change password
            const response = await changePasswordApi({
                currentPassword,
                newPassword,
            });

            if (response.data.success) {
                toast.success("Password changed successfully");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error changing password:", error.message);
            toast.error(error.message);
        }
    };

    const toggleShowPassword = (passwordType, setShowPassword) => {
        setShowPassword((prev) => !prev);
    };

    return (

        <div class="container">
            <div className="profile-page-container d-flex flex-column align-items-center justify-content-center">
                <h1>Change Your Password</h1>
                <form id="fgt" onSubmit={handlePasswordChange}>
                    <div class="mb-3">
                        Current Password:
                        <p class="password form-control">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <i
                                class={`fas ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => toggleShowPassword("current", setShowCurrentPassword)}
                            ></i>
                        </p>
                    </div>
                    <div class="mb-3">
                        <label class="password-label">
                            New Password:
                            <div class="password form-control">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <i
                                    class={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}
                                    onClick={() => toggleShowPassword("new", setShowNewPassword)}
                                ></i>
                            </div>
                        </label>
                    </div>
                    <div class="mb-3">
                        <label class="password-label">
                            Confirm New Password:
                            <div class="password form-control">
                                <input
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                                <i
                                    class={`fas ${showConfirmNewPassword ? "fa-eye-slash" : "fa-eye"}`}
                                    onClick={() => toggleShowPassword("confirm", setShowConfirmNewPassword)}
                                ></i>
                            </div>
                        </label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}><button className="btn btn-success">
                        Change Password
                    </button></div>

                </form>
            </div>
        </div>


    );
};

export default ChangePassword;
