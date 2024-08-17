import axios from "axios";

const Api = axios.create({

    //backend ko url baseurl ma halne


    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

//configuration for axios
//configuration for axios

const config = {
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
    },
};


// //Creating test api
// export const homeApi = () => Api.get("/home"); //http://localhost:5000/test


//Creating register api
export const registerApi = (data) => Api.post("/api/user/create", data);

// //Creating login api
export const loginApi = (data) => Api.post("/api/user/login", data);

// export const loginApi = (data) => Api.post("/api/user/login", data);

// create product API
export const createProductApi = (formData) =>
    Api.post("/api/product/create_product", formData);

// get products API
export const getAllProductsApi = () => Api.get("/api/product/get_products");

//get single product API
export const getSingleProductApi = (id) =>
    Api.get(`/api/product/get_product/${id}`);

//update product
export const updateProductApi = (id, formData) =>
    Api.put(`/api/product/update_product/${id}`, formData, config);

//delete product
export const deleteProductApi = (id) =>
    Api.delete(`/api/product/delete_product/${id}`, config);

export const changePasswordApi = (id) => Api.post("/api/user/change_password", id, config);
//api ma    
export const getUserProfileApi = () => {
    return Api.get("/api/user/profile", config); // Ensure `config` is passed here
};
export const updateUserProfileApi = (userId, data) =>
    Api.put(`/api/user/update_profile/${userId}`, data,config);

//reset password
export const sendEmailApi = data => Api.post('/api/user/resetpassword', data);
export const verifyCodeApi = data => Api.post('/api/user/resetcode', data, config);
export const updatePasswordApi = data => Api.post('/api/user/updatepassword', data);

//cart APIs
export const createCartApi = (data) => Api.post("/api/user/create_cart", data);
export const getCartApi = (id) => Api.get(`/api/user/get_cart/${id}`);
export const deleteCartApi = (id) =>
    Api.delete(`/api/user/remove_cart/${id}`, config);

export const orderCategory = (data) => Api.post(`/api/order/create`, data);
export const getOrders = () => Api.get(`/api/order/getOrders`, config);
export const getOrdersByuserId = (userId) =>
    Api.get(`/api/order/getOrdersByUser/${userId}`);
export const updateOrdersApi = (orderId, formData) =>
    Api.put(`/api/order/update_order/${orderId}/status`, formData, config);


// fav
export const addFavoriteApi = (data) => Api.post("/api/user/add_fav", data);
export const getFavoritesApi = (id) => Api.get(`/api/user/get_fav/${id}`);
export const removeFavoriteApi = (id) =>
    Api.delete(`/api/user/remove_fav/${id}`, config);
    

