# API Services

This directory contains all the API service modules that handle communication with the backend server.

## Base Configuration

All services use the base configuration defined in [api.ts](./api.ts) which sets the base URL to `http://localhost:8080`.

## Services

- [api.ts](./api.ts) - Base axios configuration with interceptors
- [authService.ts](./authService.ts) - Authentication related endpoints
- [userService.ts](./userService.ts) - User profile and orders endpoints
- [productService.ts](./productService.ts) - Products, categories, and tags endpoints
- [cartService.ts](./cartService.ts) - Shopping cart endpoints
- [orderService.ts](./orderService.ts) - Order management endpoints
- [reviewService.ts](./reviewService.ts) - Product review endpoints

## Usage

Import services in your components or stores:

```typescript
import { authService } from '@/services/authService'
import { productService } from '@/services/productService'
// or import all services
import { authService, userService } from '@/services'
```

## Authentication

The API automatically includes the JWT token from localStorage in the Authorization header for all requests. If a 401 Unauthorized response is received, the user will be redirected to the login page and the token will be cleared from localStorage.
