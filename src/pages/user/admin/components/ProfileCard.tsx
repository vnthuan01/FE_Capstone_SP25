import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Settings, Activity } from 'lucide-react';
import { useReport } from '@/hooks/useReport';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DialogViewUser } from './UserProfileDialog';
import type { UserItem } from '@/services/reportService';
import AvatarExample from '@/assets/avatar-example.jpeg';
const ProfileCards: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 3;

  const { data: userList, isLoading } = useReport().useUsers({
    pageNumber,
    pageSize,
  });

  const [selectedUser, setSelectedUser] = useState<UserItem>();
  const [dialogOpen, setDialogOpen] = useState(false);

  /** Map role ID -> role name */
  const mapRole = (roleId?: number) => {
    switch (roleId) {
      case 1:
        return 'Customer';
      case 2:
        return 'Lawyer';
      case 3:
        return 'Admin';
      default:
        return 'Unknown';
    }
  };

  /** UI-friendly profiles nhưng vẫn giữ dữ liệu gốc khi click */
  const profiles = useMemo(() => {
    if (!userList?.data) return [];

    return userList.data.map((u: UserItem) => ({
      ui: {
        id: u.id,
        name: u.fullName ?? 'Unknown User',
        role: mapRole(u.role),
        description: u.description ?? 'No description available.',
        avatar: u.avatarUrl,
      },
      original: u,
    }));
  }, [userList]);

  const openProfile = (user: UserItem) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Profile Cards</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profiles.map(({ ui, original }) => (
              <Card
                key={ui.id}
                className="relative group rounded-2xl overflow-hidden shadow-md border transition 
                hover:shadow-xl hover:border-primary/40"
              >
                <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-500 text-white p-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 rounded-full">
                      <AvatarImage src={ui.avatar || AvatarExample} />
                      <AvatarFallback>{ui.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <CardTitle className="text-white">{ui.name}</CardTitle>
                      <CardDescription className="text-white/80">{ui.role}</CardDescription>
                    </div>
                  </div>

                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-3 rounded-full shadow">
                    {ui.role}
                  </Button>
                </CardHeader>

                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm mb-4">{ui.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                    {[
                      {
                        icon: <FileText className="w-5 h-5" />,
                        label: 'View Profile',
                        action: 'view',
                      },
                      {
                        icon: (
                          <Activity className="w-5 h-5 text-slate-400 pointer-events-none opacity-50" />
                        ),
                        label: 'Activity',
                      },
                      {
                        icon: (
                          <Settings className="w-5 h-5 text-slate-400 pointer-events-none opacity-50" />
                        ),
                        label: 'Settings',
                      },
                    ].map((action, i) => (
                      <div
                        key={i}
                        onClick={() => (action.action === 'view' ? openProfile(original) : null)}
                        className="cursor-pointer flex flex-col items-center gap-1 text-foreground hover:text-primary transition"
                      >
                        <div className="text-purple-600 dark:text-purple-400">{action.icon}</div>
                        <span className="text-sm">{action.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-4">
            <Button
              variant={'primary'}
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((p) => p - 1)}
            >
              Previous
            </Button>

            <Button
              variant={'orange'}
              disabled={!userList?.pagination.hasNextPage}
              onClick={() => setPageNumber((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}

      <DialogViewUser open={dialogOpen} onClose={() => setDialogOpen(false)} user={selectedUser} />
    </div>
  );
};

export default ProfileCards;
