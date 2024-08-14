import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEmailApi } from "../../apis/Apis";

const SendEmail = () => {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: email,
        };

        sendEmailApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    navigate("/resetcode", { state: { User_email: email } });
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
                    <h1 className="display-6 text-center my-4">Forgot Your Password?</h1>
                    <form className="px-3">
                        <div className="mb-5 mt-3">
                            <label htmlFor="Email">
                                Please enter your email to search for your account.
                            </label>
                            <br />
                            <br />
                            <input
                                onChange={changeEmail}
                                type="text"
                                name="mail"
                                placeholder="Enter your mail"
                                className="w-100"
                            />
                        </div>
                        <button
                            className="btn btn-success w-100"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Reset
                        </button>
                        <div>
                            <Link
                                to="/login"
                                type="button"
                                className="btn btn-outline-success w-100 mt-3"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SendEmail;
