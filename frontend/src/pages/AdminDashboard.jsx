import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    createProductApi,
    deleteProductApi,
    getAllProductsApi,
} from "../apis/Apis";

const AdminDashboard = () => {
    // Make useState
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productCategory, setProductCategory] = useState("");

    // make useState for image
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // image upload function
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    // Load all products when page loads
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getAllProductsApi().then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productPrice", productPrice);
        formData.append("productDescription", productDescription);
        formData.append("productCategory", productCategory);
        formData.append("productImage", productImage);

        // send request to backend API
        createProductApi(formData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Internal Server Error!");
            });
    };

    //delete product function
    const handleDelete = (id) => {
        //confirm dialog box
        const confirm = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (!confirm) {
            return;
        } else {
            deleteProductApi(id).then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    window.location.reload();
                }
            });
        }
    };
    return (
        <>
            <div className="m-4">
                <div className="d-flex justify-content-between mb-2">
                    <h1>Admin Dashboard</h1>

                    <button
                        type="button"
                        className="btn btn-danger "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        Add Product
                    </button>

                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                                        Create a new product!
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <label>Product Name</label>
                                    <input
                                        onChange={(e) => setProductName(e.target.value)}
                                        className="form-control mb-2"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter product name"
                                    />

                                    <label htmlFor="">Product Description</label>
                                    <textarea
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        className="form-control mb-2"
                                        placeholder={"Enter description"}
                                        cols="4"
                                        rows="4"
                                    ></textarea>

                                    <label htmlFor="">Price</label>
                                    <input
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Enter your price"
                                    />

                                    <label htmlFor="">Select category</label>
                                    <select
                                        onChange={(e) => setProductCategory(e.target.value)}
                                        className="form-select mb-2"
                                    >
                                        <option selected>Open the select menu</option>
                                        <option value="Audio">Audio</option>
                                        <option value="Mouse">Mouse</option>
                                        <option value="Joysticks">Joysticks</option>
                                        <option value="Controller">Controller</option>
                                        <option value="Cases">Cases</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Mats">Mats</option>
                                        <option value="Desktop">Desktop</option>
                                    </select>

                                    <label>Product Image</label>
                                    <input
                                        onChange={handleImageUpload}
                                        type="file"
                                        className="form-control"
                                    />

                                    {/* Preview Image */}
                                    {previewImage && (
                                        <img
                                            src={previewImage}
                                            className="img-fluid rounded object-cover mt-2"
                                            height={10}
                                            width={100}
                                            alt="#"
                                        />
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    {products.map((item) => (
                        <div className="col-md-3 mb-3" key={item._id}>
                            <div className="card" style={{ width: "19rem", height: "32rem" }}>
                                <img
                                    src={item.productImageUrl}
                                    style={{ height: '100%', width: "100%", objectFit: "cover" }}
                                    alt={item.productName}
                                />

                                <div className="card-body">
                                    <h5 className="card-text">Rs.{item.productPrice}</h5>
                                    <h5 className="card-title">{item.productName}</h5>
                                    <p className="card-text">{item.productDescription.slice(0, 20)}</p>
                                    <Link to={`/admin/edit/${item._id}`} className="btn btn-success me-1">
                                        Edit
                                    </Link>
                                    <Link onClick={() => handleDelete(item._id)} className="btn btn-danger">
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
