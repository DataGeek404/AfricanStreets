
# Africa Street Therapy Medicine API

This is the backend API for the Africa Street Therapy Medicine platform, handling payment processing, user management, and other core functionalities.

## Setup Instructions

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file based on `.env.example`
5. Run database migrations: `npm run migrate`
6. Start the server: `npm run dev` (development) or `npm start` (production)

## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```
# Server
PORT=8000
NODE_ENV=production

# Database
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_NAME=astm_db
DB_PORT=3306

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h

# Payment Providers
# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=live

# M-Pesa
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PASSKEY=your_mpesa_passkey
MPESA_SHORT_CODE=your_mpesa_short_code
MPESA_CALLBACK_URL=https://your-domain.com/api/payments/mpesa/callback
```

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## Available Endpoints

### Auth Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login an existing user
- `GET /api/auth/me` - Get current user info

### Payment Endpoints
- `POST /api/payments/stripe` - Process Stripe payment
- `POST /api/payments/paypal` - Process PayPal payment
- `POST /api/payments/mpesa` - Process M-Pesa payment
- `POST /api/payments/mpesa/callback` - M-Pesa callback URL

### Donation Endpoints
- `GET /api/donations` - Get all donations
- `GET /api/donations/:id` - Get a specific donation
- `POST /api/donations` - Create a new donation

### User Endpoints
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update a user
# AfricanStreets
