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
} from 'recharts';
import { useReport } from '@/hooks/useReport';
import { formatCurrencyVND, formatCurrencyVNDSHORT } from '@/lib/utils';

const PaymentChartYearly = () => {
  const { data, isLoading } = useReport().usePayments({
    fromDate: `${new Date().getFullYear()}-01-01`,
    toDate: `${new Date().getFullYear()}-12-31`,
    status: 'Paid',
    pageNumber: 1,
    pageSize: 100,
  });

  const chartData = useMemo(() => {
    if (!data?.data) return [];

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('en-US', { month: 'short' }),
      total: 0,
    }));

    data.data.forEach((payment) => {
      const d = new Date(payment.createdAt);
      const monthIndex = d.getMonth();
      months[monthIndex].total += payment.amount;
    });

    return months;
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow border">
          <p className="font-semibold">{label}</p>
          <p>{formatCurrencyVND(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Revenue of this year</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center text-gray-500">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatCurrencyVNDSHORT} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="total" fill="#6366f1" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentChartYearly;
