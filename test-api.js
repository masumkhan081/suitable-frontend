// Quick API test script
const API_BASE = 'http://localhost:3000';

// Test registration
async function testRegister() {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      })
    });

    const data = await response.json();
    console.log('Register Response:', data);
    return data;
  } catch (error) {
    console.error('Register Error:', error);
  }
}

// Test login
async function testLogin() {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const data = await response.json();
    console.log('Login Response:', data);
    return data;
  } catch (error) {
    console.error('Login Error:', error);
  }
}

// Test health endpoint
async function testHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    console.log('Health Response:', data);
    return data;
  } catch (error) {
    console.error('Health Error:', error);
  }
}

// Run tests
async function runTests() {
  console.log('Testing API endpoints...\n');

  await testHealth();
  console.log('\n---\n');

  await testRegister();
  console.log('\n---\n');

  await testLogin();
}

runTests();
