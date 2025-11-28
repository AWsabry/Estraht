# Migration Guide: Direct Supabase to Backend API

This guide documents the migration from direct Supabase access in the frontend to using a centralized Express.js backend API.

## Changes Overview

### Backend Changes

#### New Files Created:
1. **src/config/supabase.js** - Supabase client configuration
2. **src/controllers/**
   - `doctorsController.js` - Doctors CRUD operations
   - `patientsController.js` - Patients CRUD operations
   - `usersController.js` - Admin users CRUD operations
   - `transactionsController.js` - Transactions management
   - `couponsController.js` - Coupons management with validation
3. **src/routes/**
   - `doctorsRoutes.js`
   - `patientsRoutes.js`
   - `usersRoutes.js`
   - `transactionsRoutes.js`
   - `couponsRoutes.js`
4. **Updated:** `src/routes/index.js` - Added all new routes

### Frontend Changes

#### File Renames:
- `app/lib/supabase.ts` → `app/lib/api.ts`

#### Updated Files:
1. **app/lib/api.ts** (formerly supabase.ts)
   - Removed direct Supabase client
   - Added API client with fetch-based methods
   - All methods now call backend endpoints

2. **app/routes/home.tsx**
   - Changed from direct Supabase queries to API stats endpoints
   - Uses: `api.users.getStats()`, `api.doctors.getStats()`, etc.

3. **app/routes/users.tsx**
   - Changed from `supabase.from('admin_users')` to `api.users.getAll()`
   - Changed delete from Supabase query to `api.users.delete(id)`

4. **app/routes/doctors.tsx**
   - Changed to `api.doctors.getAll()` and `api.doctors.delete(id)`
   - Fixed useEffect syntax error

5. **app/routes/patients.tsx**
   - Changed to `api.patients.getAll()` and `api.patients.delete(id)`

6. **app/routes/transactions.tsx**
   - Changed to `api.transactions.getAll()`
   - Removed unused type imports
   - Backend now handles transaction/payment combining

7. **app/routes/coupons.tsx**
   - Changed to `api.coupons.getAll()` and `api.coupons.delete(id)`

## API Response Format

All API endpoints return data in this format:

```json
{
  "success": true,
  "data": { ... },
  "count": 10
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

## Frontend API Usage Pattern

### Before (Direct Supabase):
```typescript
const { data, error } = await supabase
  .from('doctors')
  .select('*')
  .order('updated_at', { ascending: false });

if (error) throw error;
setDoctors(data || []);
```

### After (Backend API):
```typescript
const response: any = await api.doctors.getAll();
setDoctors(response.data || []);
```

## Available API Methods

### Doctors
```typescript
api.doctors.getAll()
api.doctors.getById(id)
api.doctors.create(data)
api.doctors.update(id, data)
api.doctors.delete(id)
api.doctors.getStats()
```

### Patients
```typescript
api.patients.getAll()
api.patients.getById(id)
api.patients.create(data)
api.patients.update(id, data)
api.patients.delete(id)
api.patients.getStats()
```

### Users (Admin)
```typescript
api.users.getAll()
api.users.getById(id)
api.users.create(data)
api.users.update(id, data)
api.users.delete(id)
api.users.getStats()
```

### Transactions
```typescript
api.transactions.getAll()
api.transactions.getById(id)
api.transactions.getByDoctor(doctorId)
api.transactions.getByPatient(patientId)
api.transactions.getStats()
```

### Coupons
```typescript
api.coupons.getAll()
api.coupons.getById(id)
api.coupons.getByCode(code)
api.coupons.create(data)
api.coupons.update(id, data)
api.coupons.delete(id)
api.coupons.validate(code, userId)
api.coupons.use(id, userId)
api.coupons.getStats()
```

## Environment Setup

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

## Running the Application

1. **Start Backend:**
   ```bash
   cd estraht-backend
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd estraht-dashboard
   npm run dev
   ```

## Benefits of This Architecture

1. **Security**: Supabase credentials only in backend, not exposed to frontend
2. **Control**: All data access goes through your controlled API
3. **Flexibility**: Easy to add authentication, rate limiting, logging
4. **Validation**: Backend can validate all data before database operations
5. **Business Logic**: Complex operations handled server-side
6. **Caching**: Can implement caching at API level
7. **Monitoring**: Centralized logging and error tracking

## Testing

Test the API directly:

```bash
# Test connection
curl http://localhost:5000/api/test

# Get all doctors
curl http://localhost:5000/api/doctors

# Get doctor stats
curl http://localhost:5000/api/doctors/stats
```

## Troubleshooting

### Issue: API returns 404
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend .env

### Issue: CORS errors
- Backend already has CORS enabled
- Check if frontend URL matches expected origin

### Issue: Supabase connection errors
- Verify Supabase credentials in backend .env
- Check Supabase project is active

## Next Steps

Consider implementing:
- Authentication middleware for API routes
- Request validation with libraries like Joi or Zod
- Rate limiting
- API documentation with Swagger
- Error logging with services like Sentry
- Database connection pooling
- Caching with Redis
