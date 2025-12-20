// import { UserRole } from '@/enums/UserRole';
import LoginPage from '@/pages/auth/LoginPage';
import DataManagementPage from '@/pages/admin/DataManagementPage';
import CoordinationPage from '@/pages/coordinator/CoordinationPage';
import type { AppRoute } from '@/types/routes';

export const routes: AppRoute[] = [
  //Authentication
  { path: '/login', element: <LoginPage />, isProtected: false },
  //Admin routes
  {
    path: '/portal/admin/dashboard',
    element: <DataManagementPage />,
    // roles: [UserRole.Admin],
    isProtected: false,
  },
  //Coordinator routes
  {
    path: '/portal/coordinator/dashboard',
    element: <CoordinationPage />,
    // roles: [UserRole.Coordinator],
    isProtected: false,
  },
];
