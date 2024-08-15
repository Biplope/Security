// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { registerApi } from "../apis/Apis";

// const Register = () => {
//     // State variables
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [passwordStrength, setPasswordStrength] = useState("");
//     const [passwordFeedback, setPasswordFeedback] = useState({
//         length: false,
//         uppercase: false,
//         lowercase: false,
//         number: false,
//         special: false,
//     });

//     // Change handlers
//     const changeFirstName = (e) => {
//         setFirstName(e.target.value);
//     };

//     const changeLastName = (e) => {
//         setLastName(e.target.value);
//     };

//     const changeEmail = (e) => {
//         setEmail(e.target.value);
//     };

//     const changePassword = (e) => {
//         const value = e.target.value;
//         setPassword(value);

//         // Password strength assessment
//         const feedback = getPasswordFeedback(value);
//         setPasswordFeedback(feedback);

//         // Assess overall strength
//         const strength = getPasswordStrength(feedback);
//         setPasswordStrength(strength);
//     };

//     const changeConfirmPassword = (e) => {
//         setConfirmPassword(e.target.value);
//     };

//     const getPasswordFeedback = (password) => {
//         return {
//             length: password.length >= 8 && password.length <= 12,
//             uppercase: /[A-Z]/.test(password),
//             lowercase: /[a-z]/.test(password),
//             number: /\d/.test(password),
//             special: /[@$!%*?&]/.test(password),
//         };
//     };

//     const getPasswordStrength = (feedback) => {
//         const criteriaMet = Object.values(feedback).filter(Boolean).length;

//         if (criteriaMet === 5) {
//             return "Strong";
//         } else if (criteriaMet >= 3) {
//             return "Medium";
//         } else {
//             return "Weak";
//         }
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Check if password and confirm password match
//         if (password !== confirmPassword) {
//             toast.error("Passwords do not match!");
//             return;
//         }

//         // Check data in console
//         console.log(firstName, lastName, email, password);

//         // Create JSON data
//         const data = {
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             password: password,
//             confirmPassword: confirmPassword,
//         };

//         // Send data to backend
//         registerApi(data)
//             .then((res) => {
//                 if (res.data.success) {
//                     toast.success(res.data.message);
//                 } else {
//                     toast.error(res.data.message);
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//                 toast.error("Internal Server Error!");
//             });
//     };

//     return (
//         <>
//             {/* Form */}     
//             <section className="vh-100 m-5">
//                 <div className="container h-100">
//                     <div className="row d-flex justify-content-center align-items-center h-100">
//                         <div className="col-lg-12 col-xl-11">
//                             <div className="card text-black">
//                                 <div className="card-body p-md-5">
//                                     <div className="row justify-content-center">
//                                         <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
//                                             <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registration Form</p>
//                                             <form className="mx-1 mx-md-4">
//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-user fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill mb-0">
//                                                         <label className="form-label" htmlFor="form3Example1c">First Name</label>
//                                                         <input onChange={changeFirstName} className="form-control" type="text" placeholder="Enter your firstname" />
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-user fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill mb-0">
//                                                         <label className="form-label" htmlFor="form3Example1c">Last Name</label>
//                                                         <input onChange={changeLastName} className="form-control" type="text" placeholder="Enter your lastname" />
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill mb-0">
//                                                         <label className="form-label" htmlFor="form3Example3c">Your Email</label>
//                                                         <input onChange={changeEmail} className="form-control" type="email" placeholder="Enter your email" />
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill">
//                                                         <label className="form-label" htmlFor="form3Example4c">Password</label>
//                                                         <input onChange={changePassword} className="form-control" type="password" placeholder="Enter your password" />
//                                                         Password Strength : 
//                                                         <small style={{ color: passwordStrength === "Strong" ? "green" : passwordStrength === "Medium" ? "orange" : "red" }}>
//                                                              {passwordStrength}
//                                                         </small><br />
//                                                         <small style={{ color: passwordFeedback.length ? "green" : "red" }}>Password must be 8-12 characters long</small><br />
//                                                         <small style={{ color: passwordFeedback.uppercase ? "green" : "red" }}>Includes an uppercase letter</small><br />
//                                                         <small style={{ color: passwordFeedback.lowercase ? "green" : "red" }}>Includes a lowercase letter</small><br />
//                                                         <small style={{ color: passwordFeedback.number ? "green" : "red" }}>Includes a number</small><br />
//                                                         <small style={{ color: passwordFeedback.special ? "green" : "red" }}>Includes a special character (!, @, #, $, etc.)</small>
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-key fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill">
//                                                         <label className="form-label" htmlFor="form3Example4cd">Confirm Password</label>
//                                                         <input onChange={changeConfirmPassword} className="form-control" type="password" placeholder="Confirm your password" />
//                                                     </div>
//                                                 </div>

//                                                 <div className="form-check d-flex justify-content-center mb-5">
//                                                     <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
//                                                     <label className="form-check-label" htmlFor="form2Example3">
//                                                         I agree to all statements in <a href="#!">Terms of Service</a>
//                                                     </label>
//                                                 </div>

//                                                 <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
//                                                     <button onClick={handleSubmit} className="btn btn-primary btn-lg">Register</button>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                         <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
//                                             <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
//                                                 className="img-fluid" alt="Sample image" />
//                                         </div>
//                                     </div>
//                                     <div className="d-flex justify-content-center">
//                                         <div>Already have an account? </div><a href="/login" className="text-dark"> Login</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Register;





import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Apis";

const Register = () => {
    // step 1 : Create a state variable
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // step 2 : Create a function for changing the state variable
    const changeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const changeLastName = (e) => {
        setLastName(e.target.value);
    };

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };

    const changePassword = (e) => {
        setPassword(e.target.value);
    };
    const changeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    //  After clicking the submit button
    const handleSubmit = (e) => {
        e.preventDefault();

        // step 1 : Check data in console
        console.log(firstName, lastName, email, password, confirmPassword);

        // Creating json data (fieldName-)
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword:confirmPassword,
        };

        // Send data to backend
        registerApi(data)
            .then((res) => {
                if (res.data.success == true) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Internal Server Error!");
            });
    };

    return (
        <>

            {/* form */}
            <section class="vh-100 m-5 ">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100 ">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black">
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registeration Form</p>

                                            <form class="mx-1 mx-md-4">

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example1c">First Name</label>
                                                        <input onChange={changeFirstName}
                                                            className="form-control "
                                                            type="text"
                                                            placeholder="Enter your firstname" />
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example1c">Last Name</label>
                                                        <input onChange={changeLastName}
                                                            className="form-control "
                                                            type="text"
                                                            placeholder="Enter your lastname" />
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">

                                                        <label class="form-label" for="form3Example3c">Your Email</label>
                                                        <input onChange={changeEmail}
                                                            className="form-control"
                                                            type="email"
                                                            placeholder="Enter your email" />
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill">

                                                        <label class="form-label" for="form3Example4c">Password</label>
                                                        <input onChange={changePassword}
                                                            className="form-control"
                                                            type="password"
                                                            placeholder="Enter your password" />
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill">

                                                        <label class="form-label" for="form3Example4c">Password</label>
                                                        <input onChange={changeConfirmPassword}
                                                            className="form-control"
                                                            type="password"
                                                            placeholder="Enter your confirm password" />
                                                    </div>
                                                </div>


                                                <div class="form-check d-flex justify-content-center mb-5">
                                                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    <label class="form-check-label" for="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button onClick={handleSubmit} class="btn btn-primary btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                class="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div>Already have an account? </div><a href="/login" className="text-dark"> Login</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;