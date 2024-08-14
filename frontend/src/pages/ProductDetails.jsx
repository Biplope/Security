import {
    faHeart as faHeartFilled,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    createCartApi,
    getSingleProductApi,
    addFavoriteApi,
} from ".././apis/Apis";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetails = () => {
    const { id } = useParams();
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productImage, setProductImage] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        getSingleProductApi(id).then((res) => {
            const productData = res.data.product;
            setProductName(productData.productName);
            setProductPrice(productData.productPrice);
            setProductCategory(productData.productCategory);
            setProductDescription(productData.productDescription);
            setProductImage(productData.productImageUrl);
            // checkIfFavorited(productData.id);
        });
    }, [id]);

    // // Function to check if the product is in the favorites
    // const checkIfFavorited = (productId) => {
    //   // This is an example. You'll need to replace it with your actual logic
    //   // for checking if a product is favorited.
    //   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    //   if (favorites.includes(productId)) {
    //     setIsFavorite(true);
    //   } else {
    //     setIsFavorite(false);
    //   }
    // };

    const handleCart = (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
            toast.error("Please log in to add items to the cart.");
            return;
        }
        const data = {
            userId: user._id,
            productId: productId,
            quantity: 1,
            status: "pending",
        };
        createCartApi(data)
            .then((res) => {
                if (!res.data.success) {
                    toast.error(res.data.message);
                } else {
                    toast.success("Product added to cart");
                }
            })
            .catch((err) => {
                toast.error("Server Error");
                console.error("Error adding to cart:", err);
            });
    };

    const handleFav = (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
            toast.error("Please log in to add items to the Favorite.");
            return;
        }
        const data = {
            userId: user._id,
            productId: productId,
            quantity: 1,
            status: "pending",
        };
        addFavoriteApi(data)
            .then((res) => {
                if (!res.data.success) {
                    toast.error(res.data.message);
                } else {
                    toast.success("Product added to Favorite");
                }
            })
            .catch((error) => {
                console.error(
                    "Error fetching user favorites:",
                    error.response || error
                );
                toast.error("Failed to fetch user favorites");
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-5">
                    <img
                        src={productImage}
                        alt={productName}
                        className="img-fluid"
                        style={{ maxWidth: "100%", height: "90%" }}
                    />
                </div>
                <div className="col-md-5">
                    <h2>{productName}</h2>
                    <p>
                        <b>Price:</b> NPR. {productPrice}
                    </p>
                    <p>
                        <b>Category:</b> {productCategory}
                    </p>
                    <p>
                        <b>Description:</b> {productDescription}
                    </p>
                    <Button
                        type="button"
                        style={{
                            backgroundColor: "#D8812F",
                            width: "150px",
                            height: "30px",
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: "black",
                            paddingBottom: "4px",
                        }}
                        onClick={() => handleCart(id)}
                    >
                        Add to Cart
                    </Button>
                </div>
                <div className="col-md-2">
                    <button
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        onClick={() => handleFav(id)}
                    >
                        <FontAwesomeIcon
                            icon={isFavorite ? faHeartFilled : faHeart}
                            style={{ fontSize: "2em", color: isFavorite ? "red" : "grey" }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;