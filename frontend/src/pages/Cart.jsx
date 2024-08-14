import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createOrderApi, deleteCartApi, getCartApi } from "../apis/Api";
import Navbar from "../components/Navbar";

const AddToCart = () => {
    const [carts, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        const parsedUserData = JSON.parse(storedUserData);
        const userId = parsedUserData._id;

        getCartApi(userId)
            .then((res) => {
                setCart(res.data.cart);
                calculateSubtotal(res.data.cart);
            })
            .catch((error) => {
                console.error("Error fetching user cart:", error);
                toast.error("Failed to fetch user cart");
            });
    }, []);

    const calculateSubtotal = (cartItems) => {
        let total = 0;
        cartItems.forEach((item) => {
            total += (item.product?.productPrice || 0) * (item.quantity || 0); // Multiply price with quantity
        });
        setSubtotal(total);
    };

    const handleDeleteCart = (id) => {
        const confirmDialog = window.confirm(
            "Are you sure you want to remove the item from the cart?"
        );
        if (!confirmDialog) {
            return;
        } else {
            deleteCartApi(id)
                .then((res) => {
                    if (res.data.success === true) {
                        toast.success(res.data.message);
                        window.location.reload();
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Error deleting cart item:", error);
                    toast.error("Failed to delete cart item");
                });
        }
    };

    const handleOrder = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
            toast.error("Please log in to add items to the cart.");
            return;
        }

        createOrderApi({
            userId: user._id,
            cartItems: carts.map(cartItem => ({ productId: cartItem.product._id, quantity: cartItem.quantity })),
            total: subtotal,
            // Update with actual address data
        }).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
            }
        }).catch(err => {
            toast.error('Server Error'); console.error('Error creating order:', err);
        });
    };
    return (
        <>
            <Navbar />
            <div className="row">
                <div className="col-md-7">
                    <div className="card p-3 mb-3 border" style={{ borderColor: "#D8812F" }}>
                        <h5 className="mb-4">Your Cart</h5>
                        {carts.length > 0 ? (
                            carts.map((item) => (
                                <div key={item._id} className="cart-item d-flex align-items-center mb-3">
                                    <div className="cart-product-image me-3">
                                        {item.product?.productImageUrl ? (
                                            <img
                                                src={item.product?.productImageUrl}
                                                alt={item.product?.productName}
                                                className="img-fluid"
                                                style={{ maxWidth: "60px", maxHeight: "60px" }}
                                            />
                                        ) : (
                                            "N/A"
                                        )}
                                    </div>
                                    <div className="cart-product-details flex-grow-1">
                                        <div className="cart-product-name mb-1">{item.product?.productName || "N/A"}</div>
                                        <div className="cart-product-category text-muted mb-1">{item.product?.productCategory || "N/A"}</div>
                                        <div className="cart-product-price mb-1">${item.product?.productPrice || "N/A"}</div>
                                    </div>
                                    <div className="cart-action d-flex align-items-center">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDeleteCart(item._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">No items in the cart.</div>
                        )}
                    </div>


                </div>

                <div className="col-md-5">
                    <div className="card p-3 mb-3 border" style={{ borderColor: "#D8812F" }}>
                        <h2 className="mb-4">Proceed to checkout</h2>
                        <div className="d-flex justify-content-between mb-3">
                            <span>Subtotal:</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <span>Total:</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className="text-center mt-4">
                            {carts.length > 0 && ( // Only render if there are items in the cart
                                <button href="/checkout" className="btn btn-sm" style={{ backgroundColor: "#D8812F", color: "black" }}
                                    onClick={handleOrder}>
                                    Proceed to Checkout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddToCart;