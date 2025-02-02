const request = require('supertest')
const app = require('./app.js')

const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});



describe('POST /login', () => {
  it('should return a httpOnly cookie and a success message', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'johndoe', password: 'password123' })
      .expect(200) // Expect status 200 for successful login
      .expect('Content-Type', /json/); // Ensure it's JSON

    // Check JSON response
    expect(response.body).toEqual({ message: 'Logged in successfully' });

    // Check if Set-Cookie header is set
    const cookies = response.headers['set-cookie'];
    expect(cookies).toBeDefined();

    // Find the token cookie
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
    expect(tokenCookie).toBeDefined();

    console.log(tokenCookie)

    // Ensure the cookie has HttpOnly flag
    expect(tokenCookie).toMatch(/HttpOnly/);
  })
  
  // ;
  // it('should return 401 on invalid credentials', async () => {
  //   const response = await request(app)
  //     .post('/login')
  //     .send({ username: 'wronguser', password: 'wrongpassword' })
  //     .expect(401);

  //   expect(response.body).toEqual({ message: 'Invalid credentials' });

  //   // Ensure no cookies are set on failure
  //   expect(response.headers['set-cookie']).toBeUndefined();
  // });
});







// test('Test login', async () => {
//   const response = await request(app).get('/items');
//   expect(response.statusCode).toBe(200);
//   expect(response.body.length).toBeGreaterThan(0);
//   expect(response.body[0].name).toBe('Sample Item 1');
// });











// test('GET /items should retrieve seeded data', async () => {
//     const response = await request(app).get('/items');
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBeGreaterThan(0);
//     expect(response.body[0].name).toBe('Sample Item 1');
// });


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