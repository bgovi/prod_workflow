# Need to setup nginx with template system to handle different configurations


# Common Headers:

## Security Headers
Strict-Transport-Security (HSTS)	Forces HTTPS for security	Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy (CSP)	Prevents XSS & data injection attacks	Content-Security-Policy: default-src 'self'
X-Frame-Options	Prevents clickjacking attacks	X-Frame-Options: DENY
X-Content-Type-Options	Prevents MIME-type sniffing	X-Content-Type-Options: nosniff
Referrer-Policy	Controls referrer info sent	Referrer-Policy: no-referrer
Permissions-Policy	Limits browser feature access	Permissions-Policy: geolocation=(), microphone=()

## Caching Headers
Cache-Control	Controls caching behavior	Cache-Control: no-store, max-age=0
ETag	Helps with resource versioning	ETag: "abc123xyz"
Last-Modified	Indicates last change of resource	Last-Modified: Tue, 01 Feb 2025 12:00:00 GMT
Expires	Sets an expiration date for cached content	Expires: Wed, 01 Mar 2025 12:00:00 GMT

## Authentication and Authorization
Authorization	Sends authentication token	Authorization: Bearer <token>
WWW-Authenticate	Used when authentication is required	WWW-Authenticate: Basic realm="Restricted"
Set-Cookie (HttpOnly, Secure)	Manages session authentication	Set-Cookie: session_id=xyz; HttpOnly; Secure; SameSite=Strict

## CORS (Cross-Origin Resource Sharing) Headers
Access-Control-Allow-Origin	Specifies allowed domains	Access-Control-Allow-Origin: *
Access-Control-Allow-Methods	Allowed HTTP methods	Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers	Allowed request headers	Access-Control-Allow-Headers: Content-Type, Authorization

## Content Headers
Content-Type	Defines response format	Content-Type: application/json
Content-Length	Specifies size of response	Content-Length: 345
Content-Encoding	Defines compression type	Content-Encoding: gzip
Transfer-Encoding	Used for chunked responses	Transfer-Encoding: chunked

## Response Control Headers
Location	Redirects the client to a new URL	Location: https://example.com/new-page
Retry-After	Tells the client when to retry	Retry-After: 120 (in seconds)

## Summary
Security	Strict-Transport-Security, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options
Caching	Cache-Control, ETag, Last-Modified, Expires
Auth & Session	Authorization, WWW-Authenticate, Set-Cookie
CORS	Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers
Content	Content-Type, Content-Length, Content-Encoding
Response Control	Location, Retry-After
