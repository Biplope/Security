import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyCodeApi } from "../../apis/Apis";

const ForgotPasswordCode = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const userEmail = location.state && location.state.User_email;

    const handleChangeCode = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleVerifyCode = (e) => {
        e.preventDefault();

        const data = {
            resetCode: verificationCode,
            email: userEmail,
        };

        verifyCodeApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    navigate("/resetpassword", { state: { User_email: userEmail } });
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Server Error");
            });
    };

    return (
        <>
            <div className="row vh-100 d-flex align-items-center justify-content-center">
                <div className="col-md-5 bg-white p-4 shadow">
                    <h1 className="display-6 text-center my-4">
                        Enter Verification Code
                    </h1>
                    <form onSubmit={handleVerifyCode}>
                        <div className="mb-5 mt-3">
                            <label htmlFor="Code">
                                Please enter the code we've sent to your email.
                            </label>
                            <br />
                            <br />
                            <input
                                type="text"
                                name="code"
                                placeholder="Enter Verification code"
                                value={verificationCode}
                                onChange={handleChangeCode}
                                className="w-100"
                            />
                        </div>
                        <button
                            onSubmit={handleVerifyCode}
                            type="submit"
                            className="btn btn-success w-100"
                        >
                            Verify
                        </button>
                        <p className="text-center mt-3">
                            Didn't get a code?{" "}
                            <a
                                href="/sendemail"
                                className="text-decoration-none text-success text-bold"
                            >
                                Click to resend
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPasswordCode;
