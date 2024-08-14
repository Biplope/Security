
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../apis/Apis";

const Login = () => {
    // make useState
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const navigate = useNavigate();
    // make change function
    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);

        const data = {
            email: email,
            password: password,
        };

        // api call
        loginApi(data)
            .then((res) => {
                console.log(res.data); // Log the entire response for debugging
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    // Set token and user data in local storage
                    localStorage.setItem("token", res.data.token);

                    const isAdmin = res.data.isAdmin;

                    // Redirect based on admin status
                    if (isAdmin) {
                        navigate("/admin/dashboard");
                    } else {
                        navigate("/user/dashboard");
                    }

                    const convertedJson = JSON.stringify(res.data.userData);
                    localStorage.setItem("user", convertedJson);
                }
            })
            .catch((err) => {
                console.log("Error from API call:", err.response?.data?.message || err.message);
                toast.error(err.response?.data?.message || "Server Error!");
            });

    };

    return (
        <div>

            <section class="vh-100">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black">
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login Form</p>

                                            <form class="mx-1 mx-md-4">

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example1c">Email</label>
                                                        <input onChange={changeEmail}
                                                            className="form-control "
                                                            type="email"
                                                            placeholder="Enter your firstname" />
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example1c">Password</label>
                                                        <input onChange={changePassword}
                                                            className="form-control "
                                                            type="password"
                                                            placeholder="Enter your lastname" />
                                                    </div>
                                                </div>





                                                <div class="form-check d-flex justify-content-center mb-5">
                                                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    <label class="form-check-label" for="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button onClick={handleSubmit} class="btn btn-primary btn-lg">Login</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                class="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div>Don't have an account? </div><a href="/register" className="text-dark"> Register</a>
                                    </div>
                                    <div className="d-flex justify-content-center"><a href="/sendemail" className="text-dark"> Forgot Password?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
