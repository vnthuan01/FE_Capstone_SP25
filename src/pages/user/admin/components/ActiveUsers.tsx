import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { formatCurrencyVND } from '@/lib/utils';
import type { UserItem } from '@/services/reportService';
import { useReport } from '@/hooks/useReport';

const ActiveUsers = () => {
  /** =======================
   *  PAGINATION STATE
   *  ======================= */
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6; // mặc định mỗi trang 6 user
  const [gotoPage, setGotoPage] = useState('');

  /** =======================
   *  FETCH API: GET USERS PAGINATED
   *  ======================= */
  const { data: userList, isLoading } = useReport().useUsers({
    pageNumber,
    pageSize,
  });
  const { data: userStats, isLoading: loadingUserStats } = useReport().useUserStatistics();
  const { data: recentPurchasesData, isLoading: loadingRecentPurchases } =
    useReport().useRecentPlanPurchases({
      days: 30,
      pageNumber: 1,
      pageSize: 10,
    });

  /** =======================
   *  PROCESS RECENT PURCHASES FOR TOP CONTRIBUTORS
   *  ======================= */
  const topContributors = useMemo(() => {
    if (!recentPurchasesData?.data) return [];

    // Group by userId and sum contributions
    const userContributions = new Map<
      string,
      {
        userId: string;
        name: string;
        plan: string;
        contribution: number;
        avatar: string;
        description: string;
      }
    >();

    recentPurchasesData.data.forEach((purchase) => {
      const existing = userContributions.get(purchase.userId);
      const contribution = purchase.amountPaid || purchase.planPrice || 0;

      if (existing) {
        existing.contribution += contribution;
        // Update to highest plan level if applicable
        if (
          purchase.planLevel >
          (existing.plan === 'Professional Plan' ? 2 : existing.plan === 'Premium Plan' ? 1 : 0)
        ) {
          existing.plan =
            purchase.planName || purchase.planLevel === 2 ? 'Professional Plan' : 'Premium Plan';
        }
      } else {
        userContributions.set(purchase.userId, {
          userId: purchase.userId,
          name: purchase.userFullName || 'Unknown User',
          plan:
            purchase.planName ||
            (purchase.planLevel === 2
              ? 'Professional Plan'
              : purchase.planLevel === 1
                ? 'Premium Plan'
                : 'Basic Plan'),
          contribution,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(purchase.userFullName || 'User')}&background=random`,
          description: `Đã mua gói ${purchase.planName}`,
        });
      }
    });

    // Convert to array, sort by contribution, and take top 10
    return Array.from(userContributions.values())
      .sort((a, b) => b.contribution - a.contribution)
      .slice(0, 10)
      .map((contributor, index) => ({
        ...contributor,
        id: index + 1,
      }));
  }, [recentPurchasesData]);

  const users = userList?.data ?? [];
  const totalRecords = userList?.pagination.totalCount ?? 0;
  const totalPages = Math.ceil(totalRecords / pageSize);

  /** =======================
   *  PAGINATION NUMBERS
   *  ======================= */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (pageNumber > 4) pages.push('...');

      const start = Math.max(2, pageNumber - 1);
      const end = Math.min(totalPages - 1, pageNumber + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (pageNumber < totalPages - 3) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT: User Table */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-gray-500 text-sm">Loading users...</p>
            ) : users.length > 0 ? (
              <>
                {/* Table */}
                <div className="overflow-x-auto">
                  <Table className="min-w-[600px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead style={{ width: '150px' }}>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u: UserItem) => (
                        <TableRow key={u.id}>
                          <TableCell>#{u.id.slice(-3)}</TableCell>
                          <TableCell>{u.fullName}</TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                u.isActive === true
                                  ? 'success'
                                  : u.isActive === false
                                    ? 'warning'
                                    : 'destructive'
                              }
                            >
                              {u.isActive === true
                                ? 'Hoạt động'
                                : u.isActive === false
                                  ? 'Ngừng hoạt động'
                                  : 'Không xác định'}{' '}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
                  <Pagination>
                    <PaginationContent className="flex flex-wrap gap-2">
                      {getPageNumbers().map((p, i) => (
                        <PaginationItem key={i}>
                          {p === '...' ? (
                            <span className="px-3">...</span>
                          ) : (
                            <Button
                              size="sm"
                              variant={pageNumber === p ? 'primary' : 'outline'}
                              onClick={() => setPageNumber(p as number)}
                            >
                              {p}
                            </Button>
                          )}
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                  </Pagination>

                  {/* Go to page */}
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={totalPages}
                      value={gotoPage}
                      onChange={(e) => setGotoPage(e.target.value)}
                      placeholder="Page #"
                      className="w-24"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        const page = Number(gotoPage);
                        if (page >= 1 && page <= totalPages) {
                          setPageNumber(page);
                          setGotoPage('');
                        }
                      }}
                    >
                      Go
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No users available.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Contributors */}
      <div className="space-y-6">
        <Card>
          <CardContent>
            {loadingUserStats ? (
              <p className="text-gray-500 text-sm">Loading users...</p>
            ) : users.length > 0 ? (
              <>
                <p className="text-lg font-medium">
                  Active Users:{' '}
                  <span className="text-green-600 font-bold">{userStats?.activeUsers}</span>
                </p>

                {userStats && userStats?.inactiveUsers > 0 && (
                  <p className="text-lg font-medium">
                    Inactive Users:{' '}
                    <span className="text-red-600 font-bold">{userStats.inactiveUsers}</span>
                  </p>
                )}

                <p className="text-gray-500 text-sm">(Users currently online)</p>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No users found.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Contributors (30 ngày gần đây)</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[365px] overflow-y-auto">
            {loadingRecentPurchases ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="animate-spin" size={20} />
                <span className="ml-2 text-sm text-muted-foreground">Đang tải...</span>
              </div>
            ) : topContributors.length > 0 ? (
              <ul className="space-y-4">
                {topContributors.map((u, i) => (
                  <li
                    key={u.userId}
                    className="flex items-start gap-4 border-b pb-4 last:border-none"
                  >
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-12 h-12 rounded-full border shadow"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=6366f1&color=fff`;
                      }}
                    />

                    <div className="flex-1 space-y-1">
                      <p className="font-semibold">
                        {i + 1}. {u.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{u.description}</p>

                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge
                          variant={
                            u.plan === 'Professional Plan'
                              ? 'success'
                              : u.plan === 'Premium Plan'
                                ? 'warning'
                                : 'info'
                          }
                        >
                          {u.plan}
                        </Badge>

                        <Badge
                          variant={
                            u.contribution >= 150_000
                              ? 'professor' // Professor Contributor
                              : u.contribution >= 100_000
                                ? 'premium' // Premium Contributor
                                : 'supporter' // Supporter
                          }
                        >
                          {u.contribution >= 150_000
                            ? 'Professor Contributor'
                            : u.contribution >= 100_000
                              ? 'Premium Contributor'
                              : 'Supporter'}
                        </Badge>
                      </div>
                    </div>

                    <span className="text-purple-700 font-bold text-lg">
                      {formatCurrencyVND(u.contribution)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Chưa có người đóng góp trong 30 ngày gần đây.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActiveUsers;
