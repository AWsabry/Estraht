import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation strings
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.users': 'Users',
    'nav.doctors': 'Doctors',
    'nav.patients': 'Patients',
    'nav.bookings': 'Bookings',
    'nav.transactions': 'Transactions',
    'nav.coupons': 'Coupons',
    'nav.reviews': 'Reviews',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.actions': 'Actions',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.create': 'Create',
    'common.update': 'Update',
    'common.back': 'Back',
    'common.logout': 'Logout',
    
    // Dashboard
    'dashboard.title': 'Dashboard Overview',
    'dashboard.welcome': 'Welcome to Estraht Admin Panel',
    'dashboard.totalUsers': 'Total Users',
    'dashboard.totalDoctors': 'Total Doctors',
    'dashboard.totalPatients': 'Total Patients',
    'dashboard.transactions': 'Transactions',
    'dashboard.activeCoupons': 'Active Coupons',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.manageUsers': 'Manage Users',
    'dashboard.manageDoctors': 'Manage Doctors',
    'dashboard.managePatients': 'Manage Patients',
    'dashboard.viewTransactions': 'View Transactions',
    'dashboard.manageCoupons': 'Manage Coupons',
    
    // Login
    'login.title': 'Estraht Admin',
    'login.subtitle': 'Sign in to access the dashboard',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.signIn': 'Sign In',
    'login.signingIn': 'Signing in...',
    
    // Doctors
    'doctors.title': 'Doctors Management',
    'doctors.subtitle': 'Manage doctors, their profiles, and specializations',
    'doctors.addDoctor': 'Add Doctor',
    'doctors.totalDoctors': 'Total Doctors',
    'doctors.avgRating': 'Avg Rating',
    'doctors.totalSessions': 'Total Sessions',
    'doctors.totalPatients': 'Total Patients',
    'doctors.search': 'Search by name, email, or specialization...',
    'doctors.doctor': 'Doctor',
    'doctors.contact': 'Contact',
    'doctors.specialization': 'Specialization',
    'doctors.experience': 'Experience',
    'doctors.rating': 'Rating',
    'doctors.price': 'Price',
    'doctors.patients': 'Patients',
    'doctors.noDoctors': 'No doctors found',
    'doctors.createTitle': 'Add New Doctor',
    'doctors.fullName': 'Full Name',
    'doctors.email': 'Email',
    'doctors.phone': 'Phone Number',
    'doctors.age': 'Age',
    'doctors.gender': 'Gender',
    'doctors.yearsOfExp': 'Years of Experience',
    'doctors.bookingPrice': 'Booking Price',
    'doctors.profileImage': 'Profile Image URL',
    'doctors.bio': 'Bio',
    'doctors.selectGender': 'Select gender',
    'doctors.male': 'Male',
    'doctors.female': 'Female',
    'doctors.other': 'Other',
    
    // Patients
    'patients.title': 'Patients Management',
    'patients.subtitle': 'Manage patient records and information',
    'patients.addPatient': 'Add Patient',
    'patients.totalPatients': 'Total Patients',
    'patients.malePatients': 'Male Patients',
    'patients.femalePatients': 'Female Patients',
    'patients.search': 'Search by name, email, or phone...',
    'patients.patient': 'Patient',
    'patients.email': 'Email',
    'patients.phone': 'Phone',
    'patients.age': 'Age',
    'patients.gender': 'Gender',
    'patients.registered': 'Registered',
    'patients.noPatients': 'No patients found',
    
    // Bookings
    'bookings.title': 'Bookings',
    'bookings.subtitle': 'Manage all medical appointments',
    'bookings.bookAppointment': 'Book an Appointment',
    'bookings.total': 'Total',
    'bookings.pending': 'Pending',
    'bookings.confirmed': 'Confirmed',
    'bookings.completed': 'Completed',
    'bookings.cancelled': 'Cancelled',
    'bookings.search': 'Search by doctor, patient, or time slot...',
    'bookings.allStatus': 'All Status',
    'bookings.patient': 'Patient',
    'bookings.doctor': 'Doctor',
    'bookings.date': 'Date',
    'bookings.timeSlot': 'Time Slot',
    'bookings.status': 'Status',
    'bookings.noAppointments': 'No appointments found',
    'bookings.createTitle': 'Create New Appointment',
    'bookings.selectDoctor': 'Select a doctor',
    'bookings.selectPatient': 'Select a patient',
    'bookings.appointmentDate': 'Appointment Date',
    'bookings.createAppointment': 'Create Appointment',
    
    // Reviews
    'reviews.title': 'Reviews Management',
    'reviews.subtitle': 'Manage patient reviews and ratings',
    'reviews.totalReviews': 'Total Reviews',
    'reviews.averageRating': 'Average Rating',
    'reviews.search': 'Search by comment, rating, booking ID, patient ID, or doctor ID...',
    'reviews.reviewId': 'Review ID',
    'reviews.bookingId': 'Booking ID',
    'reviews.patientId': 'Patient ID',
    'reviews.doctorId': 'Doctor ID',
    'reviews.rating': 'Rating',
    'reviews.comment': 'Comment',
    'reviews.createdAt': 'Created At',
    'reviews.noReviews': 'No reviews found',
    
    // Users
    'users.title': 'Users Management',
    'users.subtitle': 'Manage admin users and permissions',
    'users.addUser': 'Add User',
    
    // Transactions
    'transactions.title': 'Transactions',
    'transactions.subtitle': 'Monitor all financial transactions',
    
    // Coupons
    'coupons.title': 'Coupons Management',
    'coupons.subtitle': 'Create and manage discount coupons',
    'coupons.addCoupon': 'Add Coupon',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.users': 'المستخدمون',
    'nav.doctors': 'الأطباء',
    'nav.patients': 'المرضى',
    'nav.bookings': 'الحجوزات',
    'nav.transactions': 'المعاملات',
    'nav.coupons': 'الكوبونات',
    'nav.reviews': 'التقييمات',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.search': 'بحث',
    'common.actions': 'الإجراءات',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.close': 'إغلاق',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.create': 'إنشاء',
    'common.update': 'تحديث',
    'common.back': 'رجوع',
    'common.logout': 'تسجيل الخروج',
    
    // Dashboard
    'dashboard.title': 'نظرة عامة على لوحة التحكم',
    'dashboard.welcome': 'مرحباً بك في لوحة تحكم إسترحت',
    'dashboard.totalUsers': 'إجمالي المستخدمين',
    'dashboard.totalDoctors': 'إجمالي الأطباء',
    'dashboard.totalPatients': 'إجمالي المرضى',
    'dashboard.transactions': 'المعاملات',
    'dashboard.activeCoupons': 'الكوبونات النشطة',
    'dashboard.totalRevenue': 'إجمالي الإيرادات',
    'dashboard.quickActions': 'إجراءات سريعة',
    'dashboard.manageUsers': 'إدارة المستخدمين',
    'dashboard.manageDoctors': 'إدارة الأطباء',
    'dashboard.managePatients': 'إدارة المرضى',
    'dashboard.viewTransactions': 'عرض المعاملات',
    'dashboard.manageCoupons': 'إدارة الكوبونات',
    
    // Login
    'login.title': 'إستراهت للمدراء',
    'login.subtitle': 'قم بتسجيل الدخول للوصول إلى لوحة التحكم',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.signIn': 'تسجيل الدخول',
    'login.signingIn': 'جاري تسجيل الدخول...',
    
    // Doctors
    'doctors.title': 'إدارة الأطباء',
    'doctors.subtitle': 'إدارة الأطباء وملفاتهم الشخصية والتخصصات',
    'doctors.addDoctor': 'إضافة طبيب',
    'doctors.totalDoctors': 'إجمالي الأطباء',
    'doctors.avgRating': 'متوسط التقييم',
    'doctors.totalSessions': 'إجمالي الجلسات',
    'doctors.totalPatients': 'إجمالي المرضى',
    'doctors.search': 'البحث بالاسم أو البريد الإلكتروني أو التخصص...',
    'doctors.doctor': 'الطبيب',
    'doctors.contact': 'جهة الاتصال',
    'doctors.specialization': 'التخصص',
    'doctors.experience': 'الخبرة',
    'doctors.rating': 'التقييم',
    'doctors.price': 'السعر',
    'doctors.patients': 'المرضى',
    'doctors.noDoctors': 'لم يتم العثور على أطباء',
    'doctors.createTitle': 'إضافة طبيب جديد',
    'doctors.fullName': 'الاسم الكامل',
    'doctors.email': 'البريد الإلكتروني',
    'doctors.phone': 'رقم الهاتف',
    'doctors.age': 'العمر',
    'doctors.gender': 'الجنس',
    'doctors.yearsOfExp': 'سنوات الخبرة',
    'doctors.bookingPrice': 'سعر الحجز',
    'doctors.profileImage': 'رابط صورة الملف الشخصي',
    'doctors.bio': 'السيرة الذاتية',
    'doctors.selectGender': 'اختر الجنس',
    'doctors.male': 'ذكر',
    'doctors.female': 'أنثى',
    'doctors.other': 'آخر',
    
    // Patients
    'patients.title': 'إدارة المرضى',
    'patients.subtitle': 'إدارة سجلات المرضى والمعلومات',
    'patients.addPatient': 'إضافة مريض',
    'patients.totalPatients': 'إجمالي المرضى',
    'patients.malePatients': 'المرضى الذكور',
    'patients.femalePatients': 'المرضى الإناث',
    'patients.search': 'البحث بالاسم أو البريد الإلكتروني أو الهاتف...',
    'patients.patient': 'المريض',
    'patients.email': 'البريد الإلكتروني',
    'patients.phone': 'الهاتف',
    'patients.age': 'العمر',
    'patients.gender': 'الجنس',
    'patients.registered': 'مسجل',
    'patients.noPatients': 'لم يتم العثور على مرضى',
    
    // Bookings
    'bookings.title': 'الحجوزات',
    'bookings.subtitle': 'إدارة جميع المواعيد الطبية',
    'bookings.bookAppointment': 'حجز موعد',
    'bookings.total': 'الإجمالي',
    'bookings.pending': 'قيد الانتظار',
    'bookings.confirmed': 'مؤكد',
    'bookings.completed': 'مكتمل',
    'bookings.cancelled': 'ملغي',
    'bookings.search': 'البحث بالطبيب أو المريض أو الفترة الزمنية...',
    'bookings.allStatus': 'جميع الحالات',
    'bookings.patient': 'المريض',
    'bookings.doctor': 'الطبيب',
    'bookings.date': 'التاريخ',
    'bookings.timeSlot': 'الفترة الزمنية',
    'bookings.status': 'الحالة',
    'bookings.noAppointments': 'لم يتم العثور على مواعيد',
    'bookings.createTitle': 'إنشاء موعد جديد',
    'bookings.selectDoctor': 'اختر طبيباً',
    'bookings.selectPatient': 'اختر مريضاً',
    'bookings.appointmentDate': 'تاريخ الموعد',
    'bookings.createAppointment': 'إنشاء موعد',
    
    // Reviews
    'reviews.title': 'إدارة التقييمات',
    'reviews.subtitle': 'إدارة تقييمات المرضى والتقييمات',
    'reviews.totalReviews': 'إجمالي التقييمات',
    'reviews.averageRating': 'متوسط التقييم',
    'reviews.search': 'البحث بالتعليق أو التقييم أو معرف الحجز أو معرف المريض أو معرف الطبيب...',
    'reviews.reviewId': 'معرف التقييم',
    'reviews.bookingId': 'معرف الحجز',
    'reviews.patientId': 'معرف المريض',
    'reviews.doctorId': 'معرف الطبيب',
    'reviews.rating': 'التقييم',
    'reviews.comment': 'التعليق',
    'reviews.createdAt': 'تاريخ الإنشاء',
    'reviews.noReviews': 'لم يتم العثور على تقييمات',
    
    // Users
    'users.title': 'إدارة المستخدمين',
    'users.subtitle': 'إدارة المستخدمين الإداريين والصلاحيات',
    'users.addUser': 'إضافة مستخدم',
    
    // Transactions
    'transactions.title': 'المعاملات',
    'transactions.subtitle': 'مراقبة جميع المعاملات المالية',
    
    // Coupons
    'coupons.title': 'إدارة الكوبونات',
    'coupons.subtitle': 'إنشاء وإدارة كوبونات الخصم',
    'coupons.addCoupon': 'إضافة كوبون',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  // Start with 'en' on both server and client to avoid hydration mismatch
  const [language, setLanguageState] = useState<Language>('en');

  // Initialize language after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      const lang = (saved === 'en' || saved === 'ar') ? saved : 'en';
      // The inline script already set the direction, but update state to match
      setLanguageState(lang);
      // Ensure direction matches (script should have set it, but double-check)
      if (document.documentElement.dir !== (lang === 'ar' ? 'rtl' : 'ltr')) {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      }
      document.documentElement.lang = lang;
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  // Use language state directly after mount to ensure reactivity
  // Before mount, always false to match server render
  const isRTL = mounted ? language === 'ar' : false;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Immediately update document direction for instant visual feedback
    if (typeof window !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

