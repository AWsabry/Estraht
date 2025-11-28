# Estraht Medical Platform

A comprehensive medical platform with a dashboard for managing doctors, patients, transactions, and coupons.

## Project Structure

```
Estraht/
├── estraht-backend/          # Express.js API server
└── estraht-dashboard/        # React Router dashboard frontend
```

## Backend (estraht-backend)

### Tech Stack
- **Node.js** with **Express.js**
- **Supabase** for database
- **ES Modules** (type: "module")
- **CORS** enabled

### Setup

1. Navigate to the backend directory:
   ```bash
   cd estraht-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your Supabase credentials:
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

5. Start the server:
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

### API Endpoints

#### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/stats` - Get doctor statistics
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

#### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/stats` - Get patient statistics
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

#### Admin Users
- `GET /api/users` - Get all admin users
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Transactions
- `GET /api/transactions` - Get all transactions (combined)
- `GET /api/transactions/stats` - Get transaction statistics
- `GET /api/transactions/history` - Get transactions history only
- `GET /api/transactions/payments` - Get payment history only
- `GET /api/transactions/doctor/:doctorId` - Get transactions by doctor
- `GET /api/transactions/patient/:patientId` - Get transactions by patient
- `GET /api/transactions/:id` - Get transaction by ID

#### Coupons
- `GET /api/coupons` - Get all coupons
- `GET /api/coupons/stats` - Get coupon statistics
- `GET /api/coupons/code/:code` - Get coupon by code
- `GET /api/coupons/:id` - Get coupon by ID
- `POST /api/coupons` - Create new coupon
- `POST /api/coupons/validate/:code` - Validate coupon
- `POST /api/coupons/:id/use` - Use/redeem coupon
- `PUT /api/coupons/:id` - Update coupon
- `DELETE /api/coupons/:id` - Delete coupon

### API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "count": 10,
  "message": "Optional message"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error info"
}
```

## Frontend (estraht-dashboard)

### Tech Stack
- **React 19**
- **React Router 7**
- **TypeScript**
- **Tailwind CSS 4**
- **Vite**
- **Lucide React** (icons)

### Setup

1. Navigate to the dashboard directory:
   ```bash
   cd estraht-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The dashboard will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run typecheck  # Run TypeScript type checking
```

### Dashboard Features

- **Dashboard Overview** - Stats and quick actions
- **Users Management** - Manage admin users
- **Doctors Management** - View and manage doctor profiles
- **Patients Management** - View and manage patient records
- **Transactions** - Monitor all financial transactions
- **Coupons** - Create and manage discount coupons

### Dashboard Routes

- `/` - Dashboard overview
- `/users` - Admin users management
- `/doctors` - Doctors management
- `/patients` - Patients management
- `/transactions` - Transactions history
- `/coupons` - Coupons management

## Database Schema

The application uses Supabase with the following main tables:

- `admin_users` - Admin user accounts
- `doctors` - Doctor profiles and information
- `patients` - Patient records
- `transactions_history` - Transaction records
- `payment_history` - Payment history
- `coupon` - Discount coupons
- `coupon_usage` - Coupon usage tracking

## Development Workflow

1. **Start the backend**:
   ```bash
   cd estraht-backend
   npm run dev
   ```

2. **Start the frontend** (in a new terminal):
   ```bash
   cd estraht-dashboard
   npm run dev
   ```

3. Access the dashboard at `http://localhost:5173`

## Testing the API

You can test the backend API using curl or any API client:

```bash
# Test connection
curl http://localhost:5000/api/test

# Get all doctors
curl http://localhost:5000/api/doctors

# Get doctor statistics
curl http://localhost:5000/api/doctors/stats
```

## Production Deployment

### Backend
1. Set environment variables on your hosting platform
2. Build and deploy:
   ```bash
   npm install --production
   npm start
   ```

### Frontend
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `build` directory to your hosting platform

## Environment Variables

### Backend (.env)
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC
