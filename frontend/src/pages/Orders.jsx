import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrdersByuserId } from ".././apis/Apis";

const OrdersPage = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                getOrdersByuserId(user._id).then((response) => {
                    if (response.data.success) {
                        setOrders(response.data.orders);
                    } else {
                        toast.error("Failed to fetch orders");
                    }
                });
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Error fetching orders");
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div>
            <h2>My Orders</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Details</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) =>
                        order.items.map((item, index) => (
                            <tr key={item._id}>
                                {index === 0 && (
                                    <td rowSpan={order?.items.length}>{order?.orderId}</td>
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
                                </td>
                                <td>{item.quantity}</td>
                                {index === 0 && (
                                    <td rowSpan={order?.items.length}>{order?.status}</td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;