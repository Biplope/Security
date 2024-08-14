import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFavoritesApi, removeFavoriteApi } from "../apis/Apis";

const FavoritesAndCart = ({ }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        const parsedUserData = JSON.parse(storedUserData);
        const userId = parsedUserData._id;

        getFavoritesApi(userId)
            .then((res) => {
                setFavorites(res.data.favorite);
            })
            .catch((error) => {
                console.error("Error fetching user favorites:", error);
                toast.error("Failed to fetch user favorites");
            });
    }, []);

    const handleRemoveFavorite = (id) => {
        const confirmDialog = window.confirm(
            "Are you sure you want to remove the item from favorites?"
        );
        if (!confirmDialog) {
            return;
        } else {
            removeFavoriteApi(id)
                .then((res) => {
                    if (res.data.success === true) {
                        toast.success(res.data.message);
                        window.location.reload(); // Refresh to update favorites
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Error removing favorite item:", error);
                    toast.error("Failed to remove favorite item");
                });
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div
                        className="card p-3 mb-3 border"
                        style={{ borderColor: "#D8812F" }}
                    >
                        <h5 className="mb-4">Your Favorites</h5>
                        {favorites.length > 0 ? (
                            favorites.map((item) => (
                                <div
                                    key={item._id}
                                    className="favorite-item d-flex align-items-center mb-3"
                                >
                                    <div className="favorite-product-image me-3">
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
                                    <div className="favorite-product-details flex-grow-1">
                                        <div className="favorite-product-name mb-1">
                                            {item.product?.productName || "N/A"}
                                        </div>
                                        <div className="favorite-product-category text-muted mb-1">
                                            {item.product?.productCategory || "N/A"}
                                        </div>
                                        <div className="favorite-product-price mb-1">
                                            ${item.product?.productPrice || "N/A"}
                                        </div>
                                    </div>
                                    <div className="favorite-action d-flex align-items-center">
                                        <button
                                            className="btn btn-sm btn-outline-danger me-2"
                                            onClick={() => handleRemoveFavorite(item._id)}
                                        >
                                            <FontAwesomeIcon icon={faHeartBroken} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">No favorites added.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FavoritesAndCart;