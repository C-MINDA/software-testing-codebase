const request = require("supertest");
const API_URL = "http://localhost:3000";

// API TEST: verifying backend endpoints (Integration Layer)
describe("API Layer Tests", () => {
  test("GET /products returns 200 and list of products", async () => {
    const response = await request(API_URL).get("/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // STUDENT: Implement the POST /cart test below
  // requirements:
  // 1. Send a POST request to /cart with a valid cart item
  // 2. Assert status is 201
  // 3. Assert response body contains the user

  // ANSWER BEGIN
  test("POST /cart adds an item successfully", async () => {
    const cartData = {
      items: [{ id: 1, name: "Product 1", price: 50 }],
      total: 50,
      user: "testuser",
    };

    const response = await request(API_URL).post("/cart").send(cartData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toBe("testuser");
  });
  // END OF ANSWER

  test("GET /products/1 returns the Premium Hoodie", async () => {
    // ARRANGE
    const productId = 1;

    // ACT
    const response = await request(API_URL).get(`/products/${productId}`);

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Premium Hoodie");
  });
});
