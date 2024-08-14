import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../apis/Apis";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const userEmail = location.state && location.state.User_email;

    const handleChangePassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if passwords match
            if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            const response = await updatePasswordApi({
                email: userEmail,
                password: newPassword,
            });

            if (response?.data?.success) {
                toast.success(response?.data?.message);
                navigate("/login"); // Redirect to login page after successful password change
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Server Error");
        }
    };

    return (
        <>
            <div className="row vh-100 d-flex align-items-center justify-content-center">
                <div className="col-md-5 bg-white p-4 shadow">
                    <h1 className="display-6 text-center my-4">Create a new password</h1>
                    <form onSubmit={handleChangePasswordSubmit}>
                        <div className="mb-3 mt-3">
                            <label htmlFor="password">Enter new password</label>
                            <br />
                            <br />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={handleChangePassword}
                                className="w-100"
                            />
                            <br />
                            <br />
                            <label htmlFor="confirmPassword">Confirm new password</label>
                            <br />
                            <br />
                            <input
                                type="password"
                                className="w-100"
                                value={confirmPassword}
                                onChange={handleChangeConfirmPassword}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
