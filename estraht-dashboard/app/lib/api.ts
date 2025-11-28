// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API fetch helper
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

// API client
export const api = {
  // Doctors
  doctors: {
    getAll: () => apiFetch('/doctors'),
    getById: (id: string) => apiFetch(`/doctors/${id}`),
    create: (data: Partial<Doctor>) => apiFetch('/doctors', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<Doctor>) => apiFetch(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/doctors/${id}`, { method: 'DELETE' }),
    getStats: () => apiFetch('/doctors/stats'),
  },

  // Patients
  patients: {
    getAll: () => apiFetch('/patients'),
    getById: (id: string) => apiFetch(`/patients/${id}`),
    create: (data: Partial<Patient>) => apiFetch('/patients', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<Patient>) => apiFetch(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/patients/${id}`, { method: 'DELETE' }),
    getStats: () => apiFetch('/patients/stats'),
  },

  // Users
  users: {
    getAll: () => apiFetch('/users'),
    getById: (id: string) => apiFetch(`/users/${id}`),
    create: (data: Partial<AdminUser>) => apiFetch('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<AdminUser>) => apiFetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/users/${id}`, { method: 'DELETE' }),
    getStats: () => apiFetch('/users/stats'),
  },

  // Transactions
  transactions: {
    getAll: () => apiFetch('/transactions'),
    getById: (id: string) => apiFetch(`/transactions/${id}`),
    getByDoctor: (doctorId: string) => apiFetch(`/transactions/doctor/${doctorId}`),
    getByPatient: (patientId: string) => apiFetch(`/transactions/patient/${patientId}`),
    getStats: () => apiFetch('/transactions/stats'),
  },

  // Coupons
  coupons: {
    getAll: () => apiFetch('/coupons'),
    getById: (id: string) => apiFetch(`/coupons/${id}`),
    getByCode: (code: string) => apiFetch(`/coupons/code/${code}`),
    create: (data: Partial<Coupon>) => apiFetch('/coupons', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<Coupon>) => apiFetch(`/coupons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/coupons/${id}`, { method: 'DELETE' }),
    validate: (code: string, userId: string) => apiFetch(`/coupons/validate/${code}`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
    use: (id: string, userId: string) => apiFetch(`/coupons/${id}/use`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
    getStats: () => apiFetch('/coupons/stats'),
  },

  // bookings
  bookings: {
    getAll: () => apiFetch('/bookings'),
    getById: (id: string) => apiFetch(`/bookings/${id}`),
    getByDoctor: (doctorId: string) => apiFetch(`/bookings/doctor/${doctorId}`),
    getByPatient: (patientId: string) => apiFetch(`/bookings/patient/${patientId}`),
    create: (data: Partial<Bookings>) => apiFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<Bookings>) => apiFetch(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    updateStatus: (id: string, status: string) => apiFetch(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
    delete: (id: string) => apiFetch(`/bookings/${id}`, { method: 'DELETE' }),
    getStats: () => apiFetch('/bookings/stats'),
  },
};

// Database types
export type AdminUser = {
  user_id: string;
  email: string;
  password: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  last_login: string | null;
};

export type Doctor = {
  doctor_id: string;
  full_name: string | null;
  email: string | null;
  phone_number: string | null;
  age: number | null;
  gender: string | null;
  specialization: string | null;
  bio: string | null;
  years_of_exp: number | null;
  numb_patients: number | null;
  profile_img_url: string | null;
  booking_price: number | null;
  fcm_token: string | null;
  avg_rating: number | null;
  numb_session: number | null;
  number_review: number | null;
  updated_at: string;
};

export type Patient = {
  id: string;
  email: string | null;
  name: string | null;
  role: string | null;
  created_at: string;
  age: number | null;
  gender: string | null;
  phone: string | null;
  fcm_token: string | null;
  login_id: string | null;
  profile_img_url: string | null;
};

export type Transaction = {
  id: string;
  booking_id: string | null;
  operation_id: string;
  patient_id: string;
  doctor_id: string;
  operation_status: string;
  amount: number;
  created_at: string;
};

export type Coupon = {
  id: string;
  coupon_code: string;
  valid_until: string;
  one_use: boolean;
  number_of_uses: number;
  for_user: string | null;
  is_used: boolean;
  created_at: string;
  coupon_value: string | null;
};

export type PaymentHistory = {
  id: string;
  doctor_id: string;
  patient_id: string;
  total_amount: number;
  total_actual_amount: number;
  income_history: number;
  withrowl_history: number;
  action_type: string;
  operation_status: string;
  payment_date: string;
  booking_id: string | null;
};

export type Bookings = {
  id: number;
  created_at: string;
  doctor_id: string;
  patient_id: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  doctor?: {
    doctor_id: string;
    full_name: string | null;
    email: string | null;
    specialization: string | null;
    profile_img_url: string | null;
  };
  patient?: {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    profile_img_url: string | null;
  };
};
