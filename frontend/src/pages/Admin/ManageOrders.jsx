import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrders, updateOrdersApi } from "../../apis/Apis";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    // Function to fetch all orders
    const fetchAllOrders = async () => {
        try {
            const { data } = await getOrders();
            if (data?.success) {
                setOrders(data?.order || []);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting orders!");
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const updateOrderStatus = async (orderId, status) => {
        const data = {
            status: status,
        };
        try {
            const response = await updateOrdersApi(orderId, data);
            if (response.data.success) {
                toast.success("Order status updated successfully");
                fetchAllOrders();
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status");
        }
    };

    return (
        <div>
            <h1>Manage Orders</h1>
            <div className="w-75">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Product Details</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) =>
                            order.items.map((item, index) => (
                                <tr key={item._id}>
                                    {index === 0 && (
                                        <td rowSpan={order?.items.length}>{order?.orderId}</td>
                                    )}
                                    {index === 0 && (
                                        <td rowSpan={order?.items.length}>
                                            {order?.userId.firstName + " " + order?.userId.lastName}
                                        </td>
                                    )}
                                    {index === 0 && (
                                        <td rowSpan={order?.items.length}>{order?.userId.email}</td>
                                    )}
                                    <td>
                                        {item?.productId?.productName}
                                        <br />
                                        Price: ${item?.productId?.productPrice}
                                        <br />
                                        Description: {item?.productId?.productDescription}
                                        <br />
                                        Category: {item?.productId?.category?.name}
                                        <br />
                                        <img
                                            src={item?.productId?.productImageUrl}
                                            alt="product"
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    </td>
                                    <td>{item?.quantity}</td>
                                    {index === 0 && (
                                        <td rowSpan={order?.items.length}>{order.status}</td>
                                    )}
                                    {index === 0 && (
                                        <td rowSpan={order?.items.length}>
                                            {index === 0 && (
                                                <td rowSpan={order?.items.length}>
                                                    <button
                                                        className="btn btn-info me-2"
                                                        onClick={() =>
                                                            updateOrderStatus(order._id, "processing")
                                                        }
                                                    >
                                                        Processing
                                                    </button>
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() =>
                                                            updateOrderStatus(order._id, "shipped")
                                                        }
                                                    >
                                                        Shipped
                                                    </button>
                                                </td>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;