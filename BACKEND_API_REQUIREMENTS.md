# MovieFinder Backend API Requirements

## Auth Endpoints

### 1. User Signup
**Endpoint:** `POST /api/user/signup`

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

**Response (Success - 201):**
```json
{
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  },
  "token": "string"
}
```

**Response (Error):**
```json
{
  "message": "Error description"
}
```

---

### 2. User Login
**Endpoint:** `POST /api/user/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  },
  "token": "string"
}
```

**Response (Error):**
```json
{
  "message": "Invalid credentials"
}
```

---

### 3. Get User Profile
**Endpoint:** `GET /api/user/:userId`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (Success - 200):**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "createdAt": "date"
}
```

---

### 4. Update User Profile
**Endpoint:** `PUT /api/user/:userId`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string"
}
```

**Response (Success - 200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  }
}
```

---

### 5. User Logout
**Endpoint:** `POST /api/user/logout`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (Success - 200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Database Schema - User Model

**Required Fields:**
- `id` (ObjectId/UUID) - Primary key
- `firstName` (string) - Required
- `lastName` (string) - Required
- `email` (string) - Required, Unique
- `password` (string) - Required, Hashed with bcrypt
- `createdAt` (timestamp) - Auto-generated
- `updatedAt` (timestamp) - Auto-updated

---

## Authentication Flow

1. **Signup** - User creates account, receives JWT token
2. **Login** - User authenticates with email/password, receives JWT token
3. **Protected Routes** - Include `Authorization: Bearer {token}` header
4. **Token Storage** - Frontend stores token in localStorage
5. **Logout** - Clear token from localStorage and optionally validate on backend

---

## Security Considerations

- ✅ Hash passwords with bcrypt (min 10 rounds)
- ✅ Validate email format before saving
- ✅ Use JWT for authentication (secret key in .env)
- ✅ Implement CORS properly
- ✅ Validate request bodies
- ✅ Handle duplicate email registration
- ✅ Implement rate limiting for login/signup endpoints
