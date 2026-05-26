# Microservices Workout Tracker

A modular, high-performance fitness tracking application built using a microservices architecture. The system decouples user authentication and core business logic into isolated, independently deployable services managed by a centralized API Gateway proxy.

## Architecture Overview

The system bypasses browser CORS limitations and prevents route management complexity by routing all frontend requests through a unified API Gateway. Authentication is handled stateless via JWT tokens passed dynamically through both cookies and client-side storage.


### Component Breakdown

* **Frontend (React/Vite):** Dispatches actions via Redux using the Duck architectural pattern. Manages conditional rendering for protected screens based on the presence of auth tokens.
* **API Gateway (Express Router Proxy):** Acts as the reverse proxy using `express-http-proxy`. intercepts paths, formats request stream fragments, and forwards raw payloads without body-parser truncation.
* **Auth Microservice (Express/MongoDB):** Governs registrations, access validations (`/login`, `/signup`), password adjustments, and security tokens.
* **Workout Microservice (Express/MongoDB):** Manages user tracking entries, metrics validation, and exercise data schemas. Evaluates local access layers using a secure `cookie-parser` parsing pipeline.

---

## Port Configuration & Layout

| Component | Repository Layer | Port | Runtime Command |
| :--- | :--- | :--- | :--- |
| **API Gateway** | `/services/api-gateway` | `3000` | `npm run dev` |
| **Frontend** | `/client` | `5173` | `npm run dev` |
| **Workout Service** | `/services/workout-service` | `3200` | `npm run dev` |
| **Auth Service** | `/services/auth-service` | `3300` | `npm run dev` |

---

## Core Gateway Mapping API

The reverse proxy utilizes an explicit path-resolution module to preserve nested parameter data payloads (e.g., resource indices, password tokens) directly across boundaries.

```javascript
// Base pattern matching schema inside api-gateway/index.js
app.use("/api/v1/auth", createServiceProxy("http://localhost:3300", "/api/v1/auth"));
app.use("/api/v1/workouts", createServiceProxy("http://localhost:3200", "/api/v1/workouts"));

```
# Installation & Environment Setup
 Repository Installation
Clone the project tracking directory and install dependencies within every individual sub-system container:

## Install system gateways
cd services/api-gateway && npm install

## Install background workers
cd ../auth-service && npm install
cd ../workout-service && npm install

## Install client assets
cd ../../client && npm install


# Environment Variables Config
Create a global configurations asset block within your target environment package directory (pkg/config/config.env):

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_system_wide_encryption_key
JWT_EXPIRES_IN=90d
```

# Operational Verification (Postman Execution)
System Health Diagnostics
Verify gateway initialization patterns by running a basic connection check:

Method: GET

Endpoint: http://localhost:3000/health

Expected Payload Response: ```json
{ "status": "health ok", "timestamp": "2026-05-26T..." }


# Session Credential Evaluation
Verify data parsing bypass layers through proxy structures:

1. Method: POST

2. Endpoint: http://localhost:3000/api/v1/login

3. Headers: Content-Type: application/json

4. Request Body Matrix:

```
{
  "email": "testuser@domain.com",
  "password": "securepassword123"
}
```
# Dynamic Parameters Verification
Verify routing parameters are forwarded correctly without dropping URL tokens:

Method: PATCH

Endpoint: http://localhost:3000/api/v1/resetPassword/yourTestTokenString123

Body Matrix:
```
{
  "password": "NewSecurePassword123",
  "passwordConfirm": "NewSecurePassword123"
}
```