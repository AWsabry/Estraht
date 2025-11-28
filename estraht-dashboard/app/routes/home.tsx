import { useEffect, useState } from 'react';
import type { Route } from "./+types/home";
import DashboardLayout from '../components/DashboardLayout';
import { api } from '../lib/api';
import { Users, Stethoscope, UserRound, CreditCard, Ticket, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Estraht Dashboard - Admin Panel" },
    { name: "description", content: "Manage doctors, patients, and medical services" },
  ];
}

export default function Home() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalTransactions: 0,
    activeCoupons: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const [usersRes, doctorsRes, patientsRes, txnsRes, couponsRes] = await Promise.all([
        api.users.getStats(),
        api.doctors.getStats(),
        api.patients.getStats(),
        api.transactions.getStats(),
        api.coupons.getStats(),
      ]);

      setStats({
        totalUsers: (usersRes as any).data?.totalUsers || 0,
        totalDoctors: (doctorsRes as any).data?.totalDoctors || 0,
        totalPatients: (patientsRes as any).data?.totalPatients || 0,
        totalTransactions: (txnsRes as any).data?.totalTransactions || 0,
        activeCoupons: (couponsRes as any).data?.activeCoupons || 0,
        totalRevenue: (txnsRes as any).data?.totalAmount || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      link: '/users',
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: Stethoscope,
      color: 'bg-green-100 text-green-600',
      link: '/doctors',
    },
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: UserRound,
      color: 'bg-purple-100 text-purple-600',
      link: '/patients',
    },
    {
      title: 'Transactions',
      value: stats.totalTransactions,
      icon: CreditCard,
      color: 'bg-orange-100 text-orange-600',
      link: '/transactions',
    },
    {
      title: 'Active Coupons',
      value: stats.activeCoupons,
      icon: Ticket,
      color: 'bg-pink-100 text-pink-600',
      link: '/coupons',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-yellow-100 text-yellow-600',
      link: '/transactions',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome to Estraht Admin Panel</p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading dashboard...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.link}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${card.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/users"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Manage Users</p>
                <p className="text-sm text-gray-500">View and edit admin users</p>
              </div>
            </Link>
            <Link
              to="/doctors"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Manage Doctors</p>
                <p className="text-sm text-gray-500">View doctor profiles</p>
              </div>
            </Link>
            <Link
              to="/patients"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <UserRound className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Manage Patients</p>
                <p className="text-sm text-gray-500">View patient records</p>
              </div>
            </Link>
            <Link
              to="/transactions"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">View Transactions</p>
                <p className="text-sm text-gray-500">Monitor payments</p>
              </div>
            </Link>
            <Link
              to="/coupons"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Ticket className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Manage Coupons</p>
                <p className="text-sm text-gray-500">Create discount codes</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
