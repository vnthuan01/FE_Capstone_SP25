import { type ReactNode, useState } from 'react';
import { DashboardSidebar } from './sidebar/DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface DashboardLayoutProps {
  children: ReactNode;
  projects?: Array<{ label: string; path: string; icon: string }>;
  navItems?: Array<{ label: string; path: string; icon: string }>;
  searchPlaceholder?: string;
  // onSearchChange?: (value: string) => void;
}

export function DashboardLayout({
  children,
  projects,
  navItems,
  searchPlaceholder,
  // onSearchChange,
}: DashboardLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Generate breadcrumb from pathname
  const pathnames = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathnames.map((segment, index) => {
    const url = '/' + pathnames.slice(0, index + 1).join('/');
    return {
      label: segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      url,
      isLast: index === pathnames.length - 1,
    };
  });

  return (
    <div className="relative flex min-h-screen w-full flex-row overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar projects={projects} navItems={navItems} isCollapsed={isSidebarCollapsed} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden transition-all duration-300">
        {/* Header */}
        <DashboardHeader
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
          searchPlaceholder={searchPlaceholder}
          // onSearchChange={onSearchChange}
        />

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col overflow-y-auto bg-[#f6f7f8] dark:bg-[#101922] p-4 md:p-8">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col flex-1">
            {/* Breadcrumb */}
            {breadcrumbItems.length > 0 && (
              <Breadcrumb className="py-2 mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Hệ thống</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbItems.map((item) => (
                    <BreadcrumbItem key={item.url}>
                      <BreadcrumbSeparator />
                      {item.isLast ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={item.url}>{item.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}

            {/* Page Content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
