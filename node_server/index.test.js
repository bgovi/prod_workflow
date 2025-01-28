const request = require('supertest')
const app = require('./index')


const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('GET /items should retrieve seeded data', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].name).toBe('Sample Item 1');
});


// describe('Auth Token Tests', () => {
//   test('Should return 401 without a token', async () => {
//     const res = await request(app).get('/secure');
//     expect(res.statusCode).toBe(401);
//     expect(res.body.message).toBe('Unauthorized');
//   });

//   test('Should return 200 with a valid token', async () => {
//     const token = 'valid-token'; // Replace with your actual token

//     const res = await request(app)
//       .get('/secure')
//       .set('Authorization', `Bearer ${token}`); // Pass token in the header

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe('Access granted!');
//   });
// });


// describe('Auth Flow Tests', () => {
//   let token;

//   beforeAll(async () => {
//     // Mock login and get token
//     const loginRes = await request(app)
//       .post('/login') // Your login endpoint
//       .send({ username: 'testuser', password: 'password123' });

//     token = loginRes.body.token; // Assuming the token is in the response body
//   });

//   test('Should access secure route with valid token', async () => {
//     const res = await request(app)
//       .get('/secure')
//       .set('Authorization', `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe('Access granted!');
//   });
// });