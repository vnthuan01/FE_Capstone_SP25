import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line,
} from 'recharts';
import { Loader2 } from 'lucide-react';
import { useReport } from '@/hooks/useReport';
import { formatCurrencyVND } from '@/lib/utils';

// ✅ Dữ liệu mẫu Weekly Bookings
const bookingData = [
  { name: 'Week 1', bookings: 0 },
  { name: 'Week 2', bookings: 0 },
  { name: 'Week 3', bookings: 0 },
  { name: 'Week 4', bookings: 0 },
];

const PlanStats = () => {
  const { data: planStatistics, isLoading } = useReport().usePlanSalesStatistics();

  const revenueData = useMemo(() => {
    if (!planStatistics?.planStatistics) return [];

    const dataObj: any = { name: 'Revenue' };

    planStatistics.planStatistics.forEach((stat) => {
      // Chuẩn hóa tên plan
      const cleanName = stat.planName
        .replace(' Plan', '') // Remove " Plan"
        .trim();

      dataObj[cleanName] = stat.totalRevenue || 0;
    });

    return [dataObj];
  }, [planStatistics]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-semibold">
              {entry.name}: {formatCurrencyVND(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Revenue by Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Subscription Plan</CardTitle>
          {planStatistics && (
            <p className="text-sm text-muted-foreground mt-1">
              Tổng doanh thu:{' '}
              <span className="font-semibold">
                {formatCurrencyVND(planStatistics.totalRevenue || 0)}
              </span>
            </p>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[250px]">
              <Loader2 className="animate-spin" size={24} />
              <span className="ml-2 text-sm text-muted-foreground">Đang tải dữ liệu...</span>
            </div>
          ) : revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => {
                    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
                    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
                    return value.toString();
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Basic" fill="#10b981" name="Basic" />
                <Bar dataKey="Premium" fill="#6366f1" name="Premium" />
                <Bar dataKey="Professional" fill="#f59e0b" name="Professional" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground">
              <p>Chưa có dữ liệu doanh thu</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanStats;
