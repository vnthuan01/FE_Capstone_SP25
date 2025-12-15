import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import {
  Mail,
  Phone,
  Home,
  Calendar,
  User as UserIcon,
  Fingerprint,
  ShieldCheck,
  LogIn,
} from 'lucide-react';

// Format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Người dùng chưa đăng nhập';
  return new Date(dateString).toLocaleString('vi-VN');
};

// Safe fallback display
const safe = (value: any, fallback = 'Người dùng chưa xác thực thông tin') =>
  value !== null && value !== undefined && value !== '' ? value : fallback;

// Role mapping
const getRoleName = (roleId?: number) => {
  switch (roleId) {
    case 1:
      return 'Customer';
    case 2:
      return 'Lawyer';
    case 3:
      return 'Admin';
    default:
      return 'Unknown Role';
  }
};

export function DialogViewUser({ open, onClose, user }: any) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto pr-2">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>Profile information</DialogDescription>
        </DialogHeader>

        {/* Header */}
        <div className="flex items-center gap-4 my-4">
          <Avatar className="w-20 h-20 rounded-xl">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{user.fullName?.charAt(0) ?? 'U'}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold text-xl">{safe(user.fullName)}</p>
            <p className="text-sm text-muted-foreground">{getRoleName(user.role)}</p>

            <Badge className="mt-2" variant={user.isActive ? 'success' : 'destructive'}>
              {user.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>

        {/* SECTION: BASE INFO */}
        <div className="space-y-3 text-sm mt-4 border-t pt-4 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-blue-700">
            <UserIcon size={18} /> Basic Info
          </h3>

          <div className="flex items-center gap-2 text-slate-700">
            <Fingerprint size={16} className="text-blue-600" />
            <b>User ID:</b> {safe(user.id)}
          </div>

          <div className="flex items-center gap-2">
            <UserIcon size={16} className="text-blue-600" />
            <b>Gender:</b> {safe(user.gender)}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-600" />
            <b>Date of Birth:</b> {safe(user.dateOfBirth)}
          </div>
        </div>

        {/* SECTION: CONTACT INFO */}
        <div className="space-y-3 text-sm mt-5 border-t pt-4 bg-amber-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-amber-700">
            <Phone size={18} /> Contact Info
          </h3>

          <div className="flex items-center gap-2">
            <Mail size={16} className="text-amber-600" />
            <b>Email:</b> {safe(user.email)}
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} className="text-amber-600" />
            <b>Phone:</b> {safe(user.phoneNumber)}
          </div>

          <div className="flex items-center gap-2">
            <Home size={16} className="text-amber-600" />
            <b>Address:</b>{' '}
            {safe(
              [user.address, user.city, user.province, user.postalCode].filter(Boolean).join(', '),
            )}
          </div>
        </div>

        {/* SECTION: VERIFICATION */}
        <div className="space-y-3 text-sm mt-5 border-t pt-4 bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-700">
            <ShieldCheck size={18} /> Verification
          </h3>

          {/* Email Verified */}
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-600" />
            <b>Email Verified:</b>
            <Badge variant={user.isEmailVerified ? 'success' : 'destructive'}>
              {user.isEmailVerified ? 'Yes' : 'No'}
            </Badge>
          </div>

          {/* Phone Verified */}
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-600" />
            <b>Phone Verified:</b>
            <Badge variant={user.isPhoneVerified ? 'success' : 'destructive'}>
              {user.isPhoneVerified ? 'Yes' : 'No'}
            </Badge>
          </div>
        </div>

        {/* SECTION: SYSTEM META */}
        <div className="space-y-3 text-sm mt-5 border-t pt-4 bg-purple-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-purple-700">
            <Calendar size={18} /> System Info
          </h3>

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-purple-600" />
            <b>Created At:</b> {formatDate(user.createdAt)}
          </div>

          <div className="flex items-center gap-2">
            <LogIn size={16} className="text-purple-600" />
            <b>Last Login:</b> {formatDate(user.lastLoginAt)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
