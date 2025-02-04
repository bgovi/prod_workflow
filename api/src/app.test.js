const request = require('supertest')
const app = require('./app.js')

let authToken;
let bearerToken;

beforeAll(async () => {
  // Step 1: Get session cookie by logging in
  const loginResponse = await request(app)
    .post("/login") // Adjust to your authentication route
    .send({ username: "johndoe", password: "password123" });

  // console.log(loginResponse)
  let authCookies = loginResponse.headers["set-cookie"]; // Extract cookie header
  const authTokenCookie = authCookies.find(cookie => cookie.startsWith('token='));
  expect(authTokenCookie).toBeDefined();

  authToken = authTokenCookie.split(';')[0].split('=')[1];
  // Step 2: Use the cookie to get the Bearer token
  const tokenResponse = await request(app)
    .post("/api_token_generator")
    .set("Cookie", `token=${authToken}`);
  bearerToken=tokenResponse.headers['authorization'].split(' ')[1] //Bearer <token value>
});

const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('Restricted Routes', () => {
  test("Access restricted route with Bearer token", async () => {
    try{
      const response = await request(app)
        .get("/api_token/") // Replace with actual restricted route
        .set("Authorization", `Bearer ${bearerToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual({ message: 'hola' });
    } catch(error) {
      console.log(error)
    }
  });

  test("items restricted route with Bearer token", async () => {
    try{
      const response = await request(app)
        .get("/api_token/items") // Replace with actual restricted route
        .set("Authorization", `Bearer ${bearerToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual([ { id: 1, name: 'Sample Item 1' }, { id: 2, name: 'Sample Item 2' } ]);
    } catch(error) {
      console.log(error)
    }
  });

  test("users restricted route with Authorization token in cookies", async () => {
    try{
      const response = await request(app)
        .get("/logged_in/user_info") // Replace with actual restricted route
        .set("Cookie", `token=${authToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
      console.log(response.body)
    } catch(error) {
      console.log(error)
    }
  });
})