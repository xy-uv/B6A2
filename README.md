# NAME: 🚗 Vehicle Rental System

### Live API URL: [https://vehicle-rental-system-api.vercel.app](https://vehicle-rental-system-api.vercel.app)

## 🎯 Project Overview

A backend API for a vehicle rental management system that handles:

- **Vehicles** - Manage vehicle inventory with availability tracking
- **Customers** - Manage customer accounts and profiles
- **Bookings** - Handle vehicle rentals, returns and cost calculation
- **Authentication** - Secure role-based access control (Admin and Customer roles)

---

## 🛠️ Technology Stack

- **Node.js** + **TypeScript**
- **Express.js** (web framework)
- **PostgreSQL** (database)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT authentication)

---

## Setup Instructions

1. **Clone the repository:**
   ````bash
   git clone https://github.com/xy-uv/B6A2.git```
   ````
2. **Navigate to the project directory:**
   ````bash
   cd B6A2```
   ````
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=your_desired_port
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=your_jwt_expiration_time
   ```

---

## 📚 API Documentation with Endpoints and References

### 1. User Registration

**Access:** Public  
**Description:** Register a new user account

#### Endpoint

```
POST /api/v1/auth/signup
```

#### Request Body

```json
{
  "name": "Ramsha Khan",
  "email": "ramsha@pakistan.com",
  "password": "kothin",
  "phone": "+918974637999",
  "role": "admin"
}
```

#### Success Response (201 Created)

```json
{
  "success": true,
  "message": "User inserted successfully!!",
  "data": {
    "id": 13,
    "name": "Ramsha Khan",
    "email": "ramsha@pakistan.com",
    "password": "$2b$11$IlobMg9UrJALBZSs/Wvn3uGzGuPbrIOIdYloh/7DmS415ZezTk38G",
    "phone": "+918974637999",
    "role": "admin"
  }
}
```

---

### 2. User Login

**Access:** Public  
**Description:** Login and receive JWT authentication token

#### Endpoint

```
POST /api/v1/auth/signin
```

#### Request Body

```json
{
  "email": "ramsha@pakistan.com",
  "password": "kothin"
}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Login success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoicmFtc2hhQHBha2lzdGFuLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NTEwNDI2NCwiZXhwIjoxNzY1NzA5MDY0fQ.kEiyJ7_tX9COA4hDqukZN2aSxJr4p5VobfpDdfaerRs",
    "user": {
      "id": 13,
      "name": "Ramsha Khan",
      "email": "ramsha@pakistan.com",
      "password": "$2b$11$IlobMg9UrJALBZSs/Wvn3uGzGuPbrIOIdYloh/7DmS415ZezTk38G",
      "phone": "+918974637999",
      "role": "admin"
    }
  }
}
```

---

## 🚗 Vehicle Endpoints

### 3. Create Vehicle

**Access:** Admin only  
**Description:** Add a new vehicle to the system

#### Endpoint

```
POST /api/v1/vehicles
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Request Body

```json
{
  "vehicle_name": "Royal Enfield Classic 350",
  "type": "bike",
  "registration_number": "RE-56781",
  "daily_rent_price": 99,
  "availability_status": "available"
}
```

#### Success Response (201 Created)

```json
{
  "success": true,
  "message": "Vehicle created successfully",
  "data": {
    "id": 5,
    "vehicle_name": "Royal Enfield Classic 350",
    "type": "bike",
    "registration_number": "RE-56781",
    "daily_rent_price": 99,
    "availability_status": "available"
  }
}
```

---

### 4. Get All Vehicles

**Access:** Public  
**Description:** Retrieve all vehicles in the system

#### Endpoint

```
GET /api/v1/vehicles
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": [
    {
      "id": 3,
      "vehicle_name": "Toyota Carry",
      "type": "car",
      "registration_number": "ABC-1234",
      "daily_rent_price": 67,
      "availability_status": "booked"
    },
    {
      "id": 2,
      "vehicle_name": "Mercediz Luxury Benz",
      "type": "car",
      "registration_number": "AXB-98989",
      "daily_rent_price": 999,
      "availability_status": "available"
    },
    {
      "id": 1,
      "vehicle_name": "Honda SUV",
      "type": "SUV",
      "registration_number": "ABC-78569",
      "daily_rent_price": 99,
      "availability_status": "available"
    },
    {
      "id": 5,
      "vehicle_name": "Royal Enfield Classic 350",
      "type": "bike",
      "registration_number": "RE-56781",
      "daily_rent_price": 99,
      "availability_status": "available"
    }
  ]
}
```

#### Success Response - Empty List (200 OK) If No Vehicles on Record

```json
{
  "success": true,
  "message": "No vehicles found",
  "data": []
}
```

---

### 5. Get Vehicle by ID

**Access:** Public  
**Description:** Retrieve specific vehicle details

#### Endpoint

```
GET /api/v1/vehicles/:vehicleId
```

**Example:**

```
GET /api/v1/vehicles/5
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Vehicle retrieved successfully",
  "data": {
    "id": 5,
    "vehicle_name": "Royal Enfield Classic 350",
    "type": "bike",
    "registration_number": "RE-56781",
    "daily_rent_price": 99,
    "availability_status": "available"
  }
}
```

---

### 6. Update Vehicle

**Access:** Admin only  
**Description:** Update vehicle details, price, or availability status

#### Endpoint

```
PUT /api/v1/vehicles/:vehicleId
```

**Example:**

```
PUT /api/v1/vehicles/5
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Request Body (All fields optional)

```json
{
  "vehicle_name": "Royal Enfield Classic 350",
  "type": "bike",
  "registration_number": "RE-56781",
  "daily_rent_price": 89,
  "availability_status": "available"
}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Vehicle updated successfully",
  "data": {
    "id": 5,
    "vehicle_name": "Royal Enfield Classic 350",
    "type": "bike",
    "registration_number": "RE-56781",
    "daily_rent_price": 89,
    "availability_status": "available"
  }
}
```

---

### 7. Delete Vehicle

**Access:** Admin only  
**Description:** Delete a vehicle (only if no active bookings exist)

#### Endpoint

```
DELETE /api/v1/vehicles/:vehicleId
```

**Example:**

```
DELETE /api/v1/vehicles/1
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Vehicle deleted successfully"
}
```

---

## 👥 User Endpoints

### 8. Get All Users

**Access:** Admin only  
**Description:** Retrieve all users in the system

#### Endpoint

```
GET /api/v1/users
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Dure Fishan",
      "email": "dure@pakistan.com",
      "password": "$2b$11$ynhNPyo3ru56jDdDvhuoZ.UaJXa3cxoOdgGlxXAmPCD4YrIwZb3FS",
      "phone": "+918974637380",
      "role": "admin"
    },
    {
      "id": 8,
      "name": "Seher Khan",
      "email": "seher@pakistan.com",
      "password": "$2b$11$zL6vVU04xFLHFt/htZauGeGux6/0KBEm.82WrC3oatOUzQ6a0tfg.",
      "phone": "+918974637387",
      "role": "customer"
    },
    {
      "id": 9,
      "name": "Sana Javed",
      "email": "sana@pakistan.com",
      "password": "$2b$11$VDQkrJZlK79ZU3xu2wglB.NeLSq7CX3ZeqRDIdzJ26g5BwclyQFjC",
      "phone": "+918974637388",
      "role": "customer"
    },
    {
      "id": 13,
      "name": "Ramsha Khan",
      "email": "ramsha@pakistan.com",
      "password": "$2b$11$IlobMg9UrJALBZSs/Wvn3uGzGuPbrIOIdYloh/7DmS415ZezTk38G",
      "phone": "+918974637999",
      "role": "admin"
    }
  ]
}
```

---

### 9. Get User by ID (Optionally Self)

**Access:** Admin or Own Profile
**Description:** Retrieve specific user details

#### Endpoint

```
GET /api/v1/users/:userId
```

**Example:**

```
GET /api/v1/users/1
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "Dure Fishan",
    "email": "dure@pakistan.com",
    "password": "$2b$11$ynhNPyo3ru56jDdDvhuoZ.UaJXa3cxoOdgGlxXAmPCD4YrIwZb3FS",
    "phone": "+918974637380",
    "role": "admin"
  }
}
```

---

### 10. Update User

**Access:** Admin or Own Profile  
**Description:** Admin can update any user's role or details. Customer can update own profile only

#### Endpoint

```
PUT /api/v1/users/:userId
```

**Example:**

```
PUT /api/v1/users/8
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Request Body (All fields optional)

```json
{
  "name": "Seher Khan",
  "email": "seher@pakistan.com",
  "phone": "+918974637387",
  "role": "admin"
}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 8,
    "name": "Seher Khan",
    "email": "seher@pakistan.com",
    "password": "$2b$11$zL6vVU04xFLHFt/htZauGeGux6/0KBEm.82WrC3oatOUzQ6a0tfg.",
    "phone": "+918974637387",
    "role": "admin"
  }
}
```

---

### 11. Delete User

**Access:** Admin only  
**Description:** Delete a user (only if no active bookings exist)

#### Endpoint

```
DELETE /api/v1/users/:userId
```

**Example:**

```
DELETE /api/v1/users/10
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 📅 Booking Endpoints

### 12. Create Booking

**Access:** Customer or Admin  
**Description:** Create a new booking with automatic price calculation and vehicle status update

#### Endpoint

```
POST /api/v1/bookings
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Request Body

```json
{
  "customer_id": 13,
  "vehicle_id": 5,
  "rent_start_date": "2026-01-01",
  "rent_end_date": "2026-01-11"
}
```

#### Success Response (201 Created)

```json
{
  "success": true,
  "message": "Booking inserted successfully",
  "data": {
    "id": 7,
    "customer_id": 13,
    "vehicle_id": 5,
    "rent_start_date": "2025-12-31T18:00:00.000Z",
    "rent_end_date": "2026-01-10T18:00:00.000Z",
    "total_price": 890,
    "status": "active",
    "vehicle": {
      "vehicle_name": "Royal Enfield Classic 350",
      "daily_rent_price": 89
    }
  }
}
```

---

### 13. Get All Bookings

**Access:** Role-based (Admin sees all, Customer sees own)  
**Description:** Retrieve bookings based on user role

#### Endpoint

```
GET /api/v1/bookings
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Success Response (200 OK) - Admin View

```json
{
  "success": true,
  "message": "Bookings retrieved successfully!",
  "data": [
    {
      "id": 4,
      "customer_id": 6,
      "vehicle_id": 2,
      "rent_start_date": "2026-01-14T18:00:00.000Z",
      "rent_end_date": "2026-01-20T18:00:00.000Z",
      "total_price": 5994,
      "status": "active",
      "customer": {
        "name": "Maya Ali",
        "email": "maya@pakistan.com"
      },
      "vehicle": {
        "vehicle_name": "Mercediz Luxury Benz",
        "registration_number": "AXB-98989"
      }
    },
    {
      "id": 7,
      "customer_id": 13,
      "vehicle_id": 5,
      "rent_start_date": "2025-12-31T18:00:00.000Z",
      "rent_end_date": "2026-01-10T18:00:00.000Z",
      "total_price": 890,
      "status": "active",
      "customer": {
        "name": "Ramsha Khan",
        "email": "ramsha@pakistan.com"
      },
      "vehicle": {
        "vehicle_name": "Royal Enfield Classic 350",
        "registration_number": "RE-56781"
      }
    }
  ]
}
```

#### Success Response (200 OK) - Customer View

```json
{
  "success": true,
  "message": "Bookings retrieved successfully!",
  "data": [
    {
      "id": 3,
      "customer_id": 6,
      "vehicle_id": 2,
      "rent_start_date": "2026-01-14T18:00:00.000Z",
      "rent_end_date": "2026-01-20T18:00:00.000Z",
      "total_price": 5994,
      "status": "active",
      "vehicle": {
        "vehicle_name": "Mercediz Luxury Benz",
        "registration_number": "AXB-98989",
        "type": "car"
      }
    },
    {
      "id": 4,
      "customer_id": 6,
      "vehicle_id": 2,
      "rent_start_date": "2026-01-14T18:00:00.000Z",
      "rent_end_date": "2026-01-20T18:00:00.000Z",
      "total_price": 5994,
      "status": "active",
      "vehicle": {
        "vehicle_name": "Mercediz Luxury Benz",
        "registration_number": "AXB-98989",
        "type": "car"
      }
    }
  ]
}
```

---

### 14. Update Booking

**Access:** Role-based  
**Description:** Update booking status based on user role and business rules

#### Endpoint

```
PUT /api/v1/bookings/:bookingId
```

**Example:**

```
PUT /api/v1/bookings/7
```

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

#### Request Body - Customer Cancellation

```json
{
  "status": "cancelled"
}
```

#### Request Body - Admin Mark as Returned

```json
{
  "status": "returned"
}
```

#### Success Response (200 OK) - Cancelled

```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "id": 7,
    "customer_id": 13,
    "vehicle_id": 5,
    "rent_start_date": "2025-12-31T18:00:00.000Z",
    "rent_end_date": "2026-01-10T18:00:00.000Z",
    "total_price": 890,
    "status": "cancelled"
  }
}
```

#### Success Response (200 OK) - Returned

```json
{
  "success": true,
  "message": "Booking marked as returned. Vehicle is now available",
  "data": {
    "id": 7,
    "customer_id": 13,
    "vehicle_id": 5,
    "rent_start_date": "2025-12-31T18:00:00.000Z",
    "rent_end_date": "2026-01-10T18:00:00.000Z",
    "total_price": 890,
    "status": "returned"
  }
}
```

---

### Standard Error Response Structure

```json
{
  "success": false,
  "message": "error.message",
  "errors": "error.stack"
}
```

### 15. Error Responses

**Access:** N/A
**Description:** Standardized error responses for various failure scenarios

#### Example Error Response (400 Bad Request)

```json
{
  "success": false,
  "message": "Invalid request data",
  "errors": "Detailed error stack trace"
}
```
