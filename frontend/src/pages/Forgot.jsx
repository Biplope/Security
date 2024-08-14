import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Forgot = () => {
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/forgot-password', { email })
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/login')

                }
            }).catch(err => console.log(err))
    }
    return (
        <div>
            <section class="vh-100">
                <div class="container h-100">
                    <div class=" d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card shadow text-black">
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Forgot Password</p>

                                            <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example1c">Email</label>
                                                        <input
                                                            className="form-control "
                                                            type="email"
                                                            placeholder="Enter your firstname"
                                                            onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                </div>







                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button class="btn btn-primary btn-lg">Reset</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div>Don't have an account? </div><a href="/register" className="text-dark"> Register</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Forgot
