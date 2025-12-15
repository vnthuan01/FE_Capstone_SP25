
// import { UserRole } from '@/enums/UserRole';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

export const routes = [
  //Public routes

  //Authencication
  { path: '/login', element: <LoginPage />, isProtected: false },
  { path: '/register', element: <RegisterPage />, isProtected: false },
];
