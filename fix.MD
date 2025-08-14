# todo / targets/ fixes

##

Based on my analysis of the authentication system, here's what I found regarding session validity and cookie handling:

Session/Token Information:
JWT Token Expiration:

Duration: 730 hours (30.4 days) - configured in
/b/src/config/index.ts
Storage: localStorage (not cookies)
Type: JWT access token
Current Authentication Flow:

User signs in via
SignIn.tsx
Backend generates JWT token with 730-hour expiration
Frontend stores token in localStorage (not cookies)
User data also stored in localStorage
No Cookie Implementation:

Although cookie-parser is installed in backend dependencies, it's not being used
No cookie-based session management is implemented
All authentication relies on localStorage + JWT tokens
Session Storage Details:

javascript
// Frontend stores:
localStorage.setItem('authToken', token); // JWT token
localStorage.setItem('userData', JSON.stringify(user)); // User info
localStorage.setItem('rememberMe', 'true'); // Remember me preference
Security Considerations:

Current: localStorage-based (vulnerable to XSS attacks)
Token Validity: 30+ days is quite long for a session
No Automatic Refresh: No refresh token mechanism implemented
No HttpOnly Cookies: More secure option not implemented
Recommendations:

Reduce token expiration to 24-48 hours for better security
Implement refresh tokens for seamless user experience
Consider HttpOnly cookies for more secure token storage
Add token validation middleware to check expiration on protected routes
The current system provides a 30+ day session stored in localStorage without cookie-based authentication

########
