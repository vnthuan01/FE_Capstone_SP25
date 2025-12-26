import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  isCollapsed?: boolean;
}

export function DashboardSidebar({
  projects,
  navItems,
  isCollapsed = false,
}: DashboardSidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Default projects for Admin
  const defaultProjects: ProjectItem[] = projects || [
    { label: 'Tổng quan', path: '/portal/admin/dashboard', icon: 'dashboard' },
    { label: 'Cấu hình', path: '/admin/settings', icon: 'settings' },
    { label: 'Người dùng', path: '/admin/users', icon: 'group' },
  ];

  // Default nav items for Admin
  const defaultNavItems: NavItem[] = navItems || [
    { label: 'Thống Kê', path: '/portal/admin/reports', icon: 'analytics' },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col border-r border-slate-200 dark:border-[#233648] bg-surface-light dark:bg-[#111a22] flex-shrink-0 h-screen transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo & Brand */}
      <div
        className={`flex items-center border-b border-slate-200 dark:border-[#233648] transition-all duration-300 ${
          isCollapsed ? 'justify-center px-2 py-4' : 'gap-3 px-6 py-6'
        }`}
      >
        <div className="size-8 flex items-center justify-center rounded-full bg-primary/10 text-primary py-4 flex-shrink-0">
          <span className="material-symbols-outlined text-2xl">health_and_safety</span>
        </div>
        {!isCollapsed && (
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight whitespace-nowrap">
            Cứu Trợ VN
          </h2>
        )}
      </div>

      {/* Navigation Content */}
      <div
        className="flex flex-col flex-1 overflow-y-auto gap-1 transition-all duration-300"
        style={{ padding: isCollapsed ? '1rem 0.5rem' : '1rem' }}
      >
        <TooltipProvider delayDuration={300}>
          {/* Projects Section */}
          {defaultProjects.length > 0 && (
            <>
              {!isCollapsed && (
                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-2 mt-2">
                  Hệ thống
                </div>
              )}
              {defaultProjects.map((project) => {
                const linkContent = (
                  <Link
                    key={project.path}
                    to={project.path}
                    className={`flex items-center rounded-lg transition-colors ${
                      isCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'
                    } ${
                      isActive(project.path)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-slate-600 dark:text-[#92adc9] hover:bg-slate-50 dark:hover:bg-[#1c2a38]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] flex-shrink-0">
                      {project.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="text-sm whitespace-nowrap">{project.label}</span>
                    )}
                  </Link>
                );

                return isCollapsed ? (
                  <Tooltip key={project.path}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      <p>{project.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  linkContent
                );
              })}
            </>
          )}

          {/* Divider */}
          {defaultNavItems.length > 0 && (
            <div
              className={`h-px bg-slate-200 dark:bg-[#233648] my-2 ${isCollapsed ? 'mx-2' : ''}`}
            ></div>
          )}

          {/* System Navigation */}
          {defaultNavItems.length > 0 && (
            <>
              {!isCollapsed && (
                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-2">
                  Báo cáo
                </div>
              )}
              {defaultNavItems.map((item) => {
                const linkContent = (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center rounded-lg transition-colors ${
                      isCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'
                    } ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-slate-600 dark:text-[#92adc9] hover:bg-slate-50 dark:hover:bg-[#1c2a38]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] flex-shrink-0">
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="text-sm whitespace-nowrap">{item.label}</span>
                    )}
                  </Link>
                );

                return isCollapsed ? (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  linkContent
                );
              })}
            </>
          )}
        </TooltipProvider>
      </div>

      {/* User Profile Footer */}
      <div
        className={`border-t border-slate-100 dark:border-[#233648] transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-4'}`}
      >
        <TooltipProvider delayDuration={300}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1c2a38] cursor-pointer transition-colors">
                  <div
                    className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-slate-200 dark:border-[#233648] flex-shrink-0"
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
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {user?.fullName || 'Admin User'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {user?.email || 'admin@cuutrovn.org'}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1c2a38] cursor-pointer transition-colors">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-slate-200 dark:border-[#233648] flex-shrink-0"
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
              <div className="flex flex-col overflow-hidden min-w-0">
                <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {user?.fullName || 'Admin User'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user?.email || 'admin@cuutrovn.org'}
                </span>
              </div>
            </div>
          )}
        </TooltipProvider>
      </div>
    </aside>
  );
}
