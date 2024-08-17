// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//     // get user data from local storage
//     const user = JSON.parse(localStorage.getItem("user"));

//     //Logout function
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/login");
//         window.location.reload();
//     };

//     return (

//         <><nav className="navbar navbar-expand-lg bg-body-tertiary">
//             <div className="container-fluid">
//                 <a className="navbar-brand text-danger fw-bold" href="#" >ShopNinja</a>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <a className="nav-link active" aria-current="page" href="#">Home</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Prodcts</a>
//                         </li>
//                         <li className="nav-item dropdown">
//                             <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 Catagory
//                             </a>
//                             <ul className="dropdown-menu">
//                                 <li><a className="dropdown-item" href="#">Mobile</a></li>
//                                 <li><a className="dropdown-item" href="#">Laptop</a></li>
//                                 <li><hr className="dropdown-divider" /></li>
//                                 <li><a className="dropdown-item" href="#">We dont have that</a></li>
//                             </ul>
//                         </li>
//                     </ul>
//                     <form className="d-flex gap-3 me-2" role="search">
//                         {
//                             user ? <>
//                                 <div class="dropdown">
//                                     <button
//                                         class="btn btn-secondary dropdown-toggle"
//                                         type="button"
//                                         data-bs-toggle="dropdown"
//                                         aria-expanded="false"
//                                     >
//                                         Welcome,
//                                         {user.firstName}!
//                                     </button>

//                                     <ul class="dropdown-menu">
//                                         <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
//                                         <li><Link class="dropdown-item" to="/update">Change Password</Link></li>
//                                         <li><Link class="dropdown-item" to="/logout">Logout</Link></li>
//                                     </ul>
//                                 </div>
//                             </>
//                                 : <>
//                                     <button className="btn btn-outline-danger" type="submit">Login</button>
//                                     <button className="btn btn-outline-success" type="submit">Rgister</button>
// =======
//         <>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary">
//                 <div className="container-fluid">
//                     <a className="navbar-brand text-black fw-bold" href="#">
//                         ShopNinja
//                     </a>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <Link className="nav-link active" aria-current="page" to="#">
//                                     Home
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="#">
//                                     Products
//                                 </Link>
//                             </li>
//                             <li className="nav-item dropdown">
//                                 <a
//                                     className="nav-link dropdown-toggle"
//                                     href="#"
//                                     role="button"
//                                     data-bs-toggle="dropdown"
//                                     aria-expanded="false"
//                                 >
//                                     Category
//                                 </a>
//                                 <ul className="dropdown-menu">
//                                     <li>
//                                         <Link className="dropdown-item" to="#">
//                                             Mouse
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link className="dropdown-item" to="#">
//                                             Keyboard
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link className="dropdown-item" to="#">
//                                             Headsets
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link className="dropdown-item" to="#">
//                                             Laptop
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </li>
//                         </ul>
//                         <form className="d-flex gap-2" role="search">
//                             {user ? (
//                                 <>
//                                     <div class="dropdown">
//                                         <button
//                                             class="btn btn-secondary dropdown-toggle"
//                                             type="button"
//                                             data-bs-toggle="dropdown"
//                                             aria-expanded="false"
//                                         >
//                                             Welcome,{user.firstName}!
//                                         </button>
//                                         <ul class="dropdown-menu">
//                                             <li>
//                                                 <Link class="dropdown-item" to="/profile">
//                                                     Profile
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link class="dropdown-item" to="/changepp">
//                                                     Change password
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <button onClick={handleLogout} class="dropdown-item">
//                                                     Logout
//                                                 </button>
//                                             </li>
//                                         </ul>
//                                     </div>
// >>>>>>> admin_dashboard
//                                 </>
//                             ) : (
//                                 <>
//                                     <a className="btn btn-outline-danger" role="button" href="/login">
//                                         Login
//                                     </a>
//                                     <a className="btn btn-outline-success" role="button" href="/register">
//                                         Register
//                                     </a>
//                                 </>
//                             )}
//                         </form>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     );
// };

// export default Navbar;



import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";


const Navbar = () => {


    // get user data from local storage
    const user = JSON.parse(localStorage.getItem("user"))
    const [userData, setUserData] = useState(null);

    //Logout function
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
        window.location.reload()

    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand text-danger fw-bold" href="#">Electronix</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <div className="nav-item">
                                <Link className="nav-link" to="/user/cart">
                                    Cart
                                </Link>
                            </div>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/dashboard">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contactus">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/favorite">Favorite</Link>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Fashion</Link></li>
                                    <li><Link className="dropdown-item" to="#">Electronics</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#">Gadgets</Link></li>
                                </ul>
                            </li> */}

                        </ul>
                        <form className="d-flex gap-2" role="search">
                            {
                                user ? <>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Welcome,{user.firstName}!
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/user/updatepassword">Change password</Link></li>
                                            <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>
                                        </ul>
                                    </div>
                                </>
                                    : <>
                                        <Link className="btn btn-outline-danger" to={`login`} type="submit">Login</Link>
                                        <Link className="btn btn-outline-success" to={`register`} type="submit">Register</Link>
                                    </>
                            }
                        </form>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar

