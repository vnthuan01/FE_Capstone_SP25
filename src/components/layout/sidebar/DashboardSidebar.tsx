import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

interface ProjectItem {
  label: string;
  path: string;
  icon: string;
}

interface DashboardSidebarProps {
  projects?: ProjectItem[];
  navItems?: NavItem[];
}

export function DashboardSidebar({ projects, navItems }: DashboardSidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Default projects for Admin
  const defaultProjects: ProjectItem[] = projects || [
    { label: 'MD-2024: Dữ liệu nền', path: '/admin/data-management', icon: 'dataset' },
    { label: 'FL-Hue: Lũ lụt Huế', path: '/admin/projects/fl-hue', icon: 'flood' },
    { label: 'ST-Yagi: Bão Yagi', path: '/admin/projects/st-yagi', icon: 'storm' },
    { label: 'LS-HaGiang: Sạt lở HG', path: '/admin/projects/ls-hagiang', icon: 'landslide' },
  ];

  // Default nav items for Admin
  const defaultNavItems: NavItem[] = navItems || [
    { label: 'Tổng quan', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Cấu hình', path: '/admin/settings', icon: 'settings' },
    { label: 'Người dùng', path: '/admin/users', icon: 'group' },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-[#233648] bg-surface-light dark:bg-[#111a22] flex-shrink-0">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 dark:border-[#233648]">
        <div className="size-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-2xl">health_and_safety</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
          Cứu Trợ VN
        </h2>
      </div>

      {/* Navigation Content */}
      <div className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-1">
        {/* Projects Section */}
        {defaultProjects.length > 0 && (
          <>
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-2 mt-2">
              Dự án chính
            </div>
            {defaultProjects.map((project) => (
              <Link
                key={project.path}
                to={project.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(project.path)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-slate-600 dark:text-[#92adc9] hover:bg-slate-50 dark:hover:bg-[#1c2a38]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{project.icon}</span>
                <span className="text-sm">{project.label}</span>
              </Link>
            ))}
          </>
        )}

        {/* Divider */}
        {defaultNavItems.length > 0 && (
          <div className="h-px bg-slate-100 dark:bg-[#233648] my-2"></div>
        )}

        {/* System Navigation */}
        {defaultNavItems.length > 0 && (
          <>
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-2">
              Hệ thống
            </div>
            {defaultNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-slate-600 dark:text-[#92adc9] hover:bg-slate-50 dark:hover:bg-[#1c2a38]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </>
        )}
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-[#233648]">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1c2a38] cursor-pointer transition-colors">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-slate-200 dark:border-[#233648]"
            style={{
              backgroundImage: user?.avatarUrl ? `url("${user.avatarUrl}")` : 'none',
              backgroundColor: user?.avatarUrl ? 'transparent' : '#137fec',
            }}
          >
            {!user?.avatarUrl && (
              <div className="w-full h-full flex items-center justify-center text-white font-bold">
                {user?.fullName?.charAt(0) || 'A'}
              </div>
            )}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {user?.fullName || 'Admin User'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user?.email || 'admin@cuutrovn.org'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
