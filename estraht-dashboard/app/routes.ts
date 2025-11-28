import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("users", "routes/users.tsx"),
  route("doctors", "routes/doctors.tsx"),
  route("patients", "routes/patients.tsx"),
  route("bookings", "routes/bookings.tsx"),
  route("transactions", "routes/transactions.tsx"),
  route("coupons", "routes/coupons.tsx"),
] satisfies RouteConfig;
