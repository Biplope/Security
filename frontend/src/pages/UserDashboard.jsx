import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createCartApi, getAllProductsApi } from ".././apis/Apis";



const UserDashboard = (product) => {
    //to load all products
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getAllProductsApi().then((res) => {
            setProducts(res.data.products)
        });
    }, []);
    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );


    // const { addItem } = useCart();

    // Prepare data for adding to cart



    const handleCart = (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        // Check if the user is logged in
        if (!user || !user._id) {
            toast.error("Please log in to add items to the cart.");
            return;
        }


        // Prepare data for adding to cart
        const data = {
            userId: user._id,
            productId: productId,
            quantity: 1,
            status: "pending"
        };



        // Call the API to add item to cart
        createCartApi(data).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
            }
        }).catch(err => {
            toast.error('Server Error');
            console.error('Error adding to cart:', err);
        });

    };

    return (
        <>
            <div
                id="carouselExample"
                className="carousel slide mb-5"
                data-bs-ride="carousel" // Make the carousel automatic
                data-bs-interval="2000" // Set time interval to 2 seconds (2000 milliseconds)
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="/assets/images/car1.png"
                            alt="al"
                            className="d-block w-100"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="/assets/images/car22.png"
                            alt="al"
                            className="d-block w-100"
                        />{" "}
                    </div>
                    <div className="carousel-item">
                        <img
                            src="/assets/images/carouselthree.png"
                            alt="al"
                            className="d-block w-100"
                        />{" "}
                    </div>
                </div>
                {/* Search bar */}

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="search-bar ms-5 ps-4 mb-4 w-50">
                <input
                    type="text"
                    className="form-control "
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="user-content">
                <div className="container">
                    <h3 className="mb-3">All Products</h3>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 gy-3">
                        {filteredProducts.map((product) => (
                            <div className="col mb-3" key={product._id}>
                                <Link
                                    to={`/user/productDetails/${product._id}`}
                                    className="text-decoration-none"
                                >
                                    <div
                                        className="card rounded d-flex flex-column"
                                        style={{
                                            height: "100%",
                                            boxShadow:
                                                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                                        }}
                                    >
                                        <img
                                            src={product.productImageUrl}
                                            className="card-img-top"
                                            alt={product.productName}
                                            style={{
                                                height: "150px",
                                                objectFit: "cover",
                                                borderTopLeftRadius: "0.25rem",
                                                borderTopRightRadius: "0.25rem",
                                            }}
                                        />
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="card-title">{product.productName}</h5>
                                                <p className="card-text">
                                                    Price: NPR. {product.productPrice}
                                                </p>
                                                <p className="card-text mb-3">
                                                    {product.productDescription.length > 50
                                                        ? product.productDescription.slice(0, 50) + "..."
                                                        : product.productDescription}
                                                </p>
                                            </div>
                                            <Link to="/user/cart" className="text-decoration-none">
                                                <button to="/cart" className="btn btn-indigo align-self-start">
                                                    Add to cart
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;