import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Earth,
  Menu,
  X,
  User,
  Bot,
  LogOut,
  Calendar,
  MessageSquare,
  Package,
  LayoutDashboardIcon,
} from 'lucide-react';
import logo from '@/assets/law-firm-logo.png';
import { Avatar, AvatarImage, AvatarFallback, AvatarStatus } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  AccordionMenu,
  AccordionMenuGroup,
  AccordionMenuItem,
  AccordionMenuLabel,
} from '@/components/ui/accordion-menu';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { UserRole } from '@/enums/UserRole';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<'VN' | 'EN'>(i18n.language === 'vi' ? 'VN' : 'EN');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLang('VN');
    i18n.changeLanguage('vi');
  }, []);

  const toggleLang = () => {
    if (lang === 'VN') {
      setLang('EN');
      i18n.changeLanguage('en');
    } else {
      setLang('VN');
      i18n.changeLanguage('vi');
    }
  };
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-14 h-14 border border-gray-200 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Logo Law" className="max-w-full max-h-full object-contain" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-orange-500 transition-colors">
            Lawstand
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/">{t('nav.home')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/about">{t('nav.about_us')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/resources">{t('nav.resources')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/contact">{t('nav.contact')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/#package"
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-300 hover:text-white"
                >
                  <Package className="w-4 h-4 text-white" />
                  {t('nav.package')}
                </Link>
              </NavigationMenuItem>

              {user && (
                <NavigationMenuItem>
                  <Link
                    to="/chat-with-ai-supported"
                    className={`${navigationMenuTriggerStyle()} bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-md inline-flex items-center gap-2 px-3 py-5`}
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    {t('nav.chat_with_ai')}
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* User Avatar + Language */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4 relative" ref={menuRef}>
              <Avatar
                className="cursor-pointer py-1"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                {user?.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={user.fullName || ''} />
                ) : (
                  <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                )}
                <AvatarStatus variant="online" />
              </Avatar>

              {/* Dropdown AccordionMenu */}
              {isMenuOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {user?.role === UserRole.Admin ? (
                    <AccordionMenu type="single" collapsible>
                      <AccordionMenuLabel className="px-4 py-2 text-sm font-semibold">
                        {t('nav.dashboard')}
                      </AccordionMenuLabel>
                      <AccordionMenuGroup>
                        <AccordionMenuItem
                          value="dashboard"
                          onClick={() => {
                            navigate('/dashboard');
                            setIsMenuOpen(false);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <LayoutDashboardIcon className="w-4 h-4" />
                            <span>{t('nav.dashboard')}</span>
                          </div>
                        </AccordionMenuItem>
                        <AccordionMenuItem
                          value="logout"
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                        >
                          <div className="flex items-center space-x-2 text-red-600 font-semibold">
                            <LogOut className="w-4 h-4" />
                            <span>{t('common.logout')}</span>
                          </div>
                        </AccordionMenuItem>
                      </AccordionMenuGroup>
                    </AccordionMenu>
                  ) : (
                    <AccordionMenu type="single" collapsible>
                      <AccordionMenuLabel className="px-4 py-2 text-sm font-semibold">
                        {t('nav.my_account')}
                      </AccordionMenuLabel>
                      <AccordionMenuGroup>
                        <AccordionMenuItem
                          value="profile"
                          onClick={() => {
                            navigate('/profile');
                            setIsMenuOpen(false);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>{t('nav.profile')}</span>
                          </div>
                        </AccordionMenuItem>

                        <AccordionMenuItem
                          value="chat"
                          onClick={() => {
                            navigate('/chat-with-ai-supported');
                            setIsMenuOpen(false);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4" />
                            <span>{t('nav.chat_with_ai')}</span>
                          </div>
                        </AccordionMenuItem>

                        <AccordionMenuItem
                          value="appointments"
                          onClick={() => {
                            const appointmentPath =
                              user?.role === UserRole.Lawyer
                                ? '/lawyer/appointments'
                                : '/customer/appointments';
                            navigate(appointmentPath);
                            setIsMenuOpen(false);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{t('nav.appointments')}</span>
                          </div>
                        </AccordionMenuItem>

                        <AccordionMenuItem
                          value="logout"
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                        >
                          <div className="flex items-center space-x-2 text-red-600 font-semibold">
                            <LogOut className="w-4 h-4" />
                            <span>{t('common.logout')}</span>
                          </div>
                        </AccordionMenuItem>
                      </AccordionMenuGroup>
                    </AccordionMenu>
                  )}
                </div>
              )}

              {/* Language toggle */}

              <div
                className="flex items-center space-x-1 cursor-pointer border rounded-md px-2 py-1 bg-gray-100"
                onClick={toggleLang}
              >
                <Earth className="size-4" />
                <span className="text-sm">{lang}</span>
              </div>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                size="md"
                className="px-6 py-2 rounded-lg"
                onClick={() => navigate('/register')}
              >
                {t('common.register')}
              </Button>
              <Button
                variant="orange"
                size="md"
                className="px-6 py-2 rounded-lg"
                onClick={() => navigate('/login')}
              >
                {t('common.login')}
              </Button>
              <div
                className="flex items-center space-x-1 cursor-pointer border rounded-md px-2 py-1 bg-gray-100"
                onClick={toggleLang}
              >
                <Earth className="size-4" />
                <span className="text-sm">{lang}</span>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Logo Law"
                  className="max-w-full max-h-full object-contain"
                  onClick={() => navigate('/')}
                />
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
              <Link
                to="/"
                className="block text-lg font-medium text-gray-700 hover:text-orange-500"
                onClick={() => setIsSidebarOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/about"
                className="block text-lg font-medium text-gray-700 hover:text-orange-500"
                onClick={() => setIsSidebarOpen(false)}
              >
                {t('nav.about_us')}
              </Link>
              <Link
                to="/resources"
                className="block text-lg font-medium text-gray-700 hover:text-orange-500"
                onClick={() => setIsSidebarOpen(false)}
              >
                {t('nav.resources')}
              </Link>
              <Link
                to="/contact"
                className="block text-lg font-medium text-gray-700 hover:text-orange-500"
                onClick={() => setIsSidebarOpen(false)}
              >
                {t('nav.contact')}
              </Link>

              {/* Package Button */}
              <Link
                to="/#package"
                className="flex items-center gap-2 px-4 py-3 rounded-md bg-orange-500 text-white hover:bg-orange-600 font-medium"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Package className="w-5 h-5" />
                {t('nav.package')}
              </Link>

              {/* Chat with AI Button - Only for authenticated users */}
              {user && (
                <Link
                  to="/chat-with-ai-supported"
                  className="flex items-center gap-2 px-4 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MessageSquare className="w-5 h-5" />
                  {t('nav.chat_with_ai')}
                </Link>
              )}

              {/* User Menu Items - Only for authenticated users */}
              {isAuthenticated && (
                <div className="pt-4 border-t space-y-3">
                  <div className="text-sm font-semibold text-gray-500 uppercase">
                    {t('nav.my_account')}
                  </div>

                  {user?.role === UserRole.Admin ? (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <LayoutDashboardIcon className="w-5 h-5" />
                      <span className="text-lg font-medium">{t('nav.dashboard')}</span>
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span className="text-lg font-medium">{t('nav.profile')}</span>
                      </Link>

                      <Link
                        to={
                          user?.role === UserRole.Lawyer
                            ? '/lawyer/appointments'
                            : '/customer/appointments'
                        }
                        className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <Calendar className="w-5 h-5" />
                        <span className="text-lg font-medium">{t('nav.appointments')}</span>
                      </Link>
                    </>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setIsSidebarOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-lg font-semibold">{t('common.logout')}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer: Avatar / Login + Language Toggle */}
            <div className="px-6 py-4 border-t">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <Avatar onClick={() => navigate('/profile')} className="cursor-pointer py-1">
                    {user?.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                    ) : (
                      <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                    )}
                    <AvatarStatus variant="online" />
                  </Avatar>
                  <div
                    className="flex items-center space-x-1 cursor-pointer border rounded-md px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    onClick={toggleLang}
                  >
                    <Earth className="size-4" />
                    <span className="text-sm font-medium">{lang}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full rounded-lg"
                    onClick={() => {
                      navigate('/register');
                      setIsSidebarOpen(false);
                    }}
                  >
                    {t('common.register')}
                  </Button>
                  <Button
                    variant="orange"
                    size="md"
                    className="w-full rounded-lg"
                    onClick={() => {
                      navigate('/login');
                      setIsSidebarOpen(false);
                    }}
                  >
                    {t('common.login')}
                  </Button>
                  <div
                    className="flex items-center justify-center space-x-1 cursor-pointer border rounded-md px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    onClick={toggleLang}
                  >
                    <Earth className="size-4" />
                    <span className="text-sm font-medium">{lang}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
