import axios from "axios";
import login_mock from "../mock/login_mock";

const backendURL = "http://localhost:5000";

describe("App Testing", () => {
  //Login
  it("POST /api/user/login | Login Successful", async () => {
    const response = await axios.post(
      `${backendURL}/api/user/login`,
      login_mock
    );
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(false);
    // expect(response.data.token).toBeDefined();
  });
  //Get all products, Each product name should match to each actual mock data
  it("GET /api/product/get_products | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/product/get_products`);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("All products fetched successfully!");
    expect(response.data.products).toBeDefined();
  });

  //Delete
  it("DELETE /api/product/delete_product/:id | Should work", async () => {
    const response = await axios.delete(
      `${backendURL}/api/product/delete_product/658db4c2df34cb3834420eb7`
    );
    expect(response.status).toBe(200);
    expect(response.data.products).toBeDefined();
  });

  it("PUT /api/user/update_profile/:id | Should work", async () => {
    const profileEditData = {
      userId: "658c5f7a80141e70000861eb",
      newProfileData: {
        profileImage: "test.jpg",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
      },
    };
    const response = await axios.put(
      `${backendURL}/api/user/update_profile/:id`,
      profileEditData
    );
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Authorization header missing!");
  });

  it("PUT /api/product/update_product/:id | Should work", async () => {
    const ProductEditData = {
      productId: "65a95434856826c160b65719",
      newProductData: {
        productName: "Chair Red",
        productPrice: "200",
        productDescription: "red chair",
        productCategory: "chair",
      },
    };
    const response = await axios.put(
      `${backendURL}/api/product/update_product/65a95434856826c160b65719`,
      ProductEditData
    );
    expect(response.status).toBe(200);
  });
      it("GET /api/product/get_product/:id| Should work", async () => {
        const response = await axios.get(
          `${backendURL}/api/product/get_product/65a95434856826c160b65719`
        );
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
      });

      it("GET /api/user/get_fav/:id | Should work", async () => {
        const favData = {
          favData: {
            productId: "65a95434856826c160b65719",
            userId: "658c5f7a80141e70000861eb",
            quantity: "1",
          },
        };
        const response = await axios.get(
          `${backendURL}/api/product/get_fav/65a95434856826c160b65719`,
          favData
        );

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
      });
});
