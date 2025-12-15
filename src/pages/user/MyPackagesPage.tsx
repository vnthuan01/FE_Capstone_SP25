import { useMyPlans, useMyCurrentPlan } from '@/hooks/usePlan';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  CheckCircle,
  History,
  Calendar,
  Info,
  ListChecks,
  Clock,
  DollarSign,
  Package,
} from 'lucide-react';
import Layout from '@/components/layout/UserLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Plan } from '@/services/planService';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function MyPackagesPage() {
  const { data: myPlans, isLoading, error } = useMyPlans();
  const { data: currentPlan } = useMyCurrentPlan();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [open, setOpen] = useState(false);

  const openDetail = (plan: Plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  return (
    <Layout>
      {/* ---------- PAGE HEADER ---------- */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Gói đăng ký của bạn</h1>
        <p className="text-gray-600 mt-1">
          Theo dõi tất cả các gói đăng ký hiện có và lịch sử gói của bạn.
        </p>
      </div>

      {/* ---------- MAIN CARD ---------- */}
      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle>Danh sách gói đăng ký</CardTitle>

          {currentPlan && (
            <p className="text-sm text-gray-600 mt-1">
              Gói hiện tại:{' '}
              <span className="font-semibold text-orange-600">{currentPlan.plan?.name}</span>
            </p>
          )}
        </CardHeader>

        <CardContent>
          {/* ----- Loading ----- */}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-600 py-6">
              <Loader2 className="animate-spin" />
              Đang tải dữ liệu...
            </div>
          )}

          {/* ----- Error ----- */}
          {!isLoading && error && (
            <div className="text-red-600 text-center py-6">Có lỗi xảy ra khi tải dữ liệu.</div>
          )}

          {/* ----- Empty ----- */}
          {!isLoading && !error && (!myPlans || myPlans.length === 0) && (
            <div className="flex flex-col items-center justify-center">
              <Button className="flex center" onClick={() => navigate('/#package')}>
                Xem gói dịch vụ
              </Button>
              <div className="text-gray-500 text-center py-6">Bạn chưa có gói đăng ký nào.</div>
            </div>
          )}

          {/* ----- TABLE ----- */}
          {!isLoading && !error && myPlans && myPlans.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border shadow-sm rounded">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 border text-left">Tên gói</th>
                    <th className="px-3 py-2 border text-left">Giá</th>
                    <th className="px-3 py-2 border text-center">Thời hạn</th>
                    <th className="px-3 py-2 border text-center">Trạng thái</th>
                    <th className="px-3 py-2 border text-center">Bắt đầu</th>
                    <th className="px-3 py-2 border text-center">Kết thúc</th>
                    <th className="px-3 py-2 border text-center">Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {myPlans.map((p) => {
                    return (
                      <tr key={p.id} className="odd:bg-white even:bg-gray-50 border-b">
                        {/* ---- Name ---- */}
                        <td className="border px-3 py-2 font-medium">{p.plan.name}</td>

                        {/* ---- Price ---- */}
                        <td className="border px-3 py-2">
                          {p.plan.price.toLocaleString('vi-VN')}₫
                        </td>

                        {/* ---- Duration ---- */}
                        <td className="border px-3 py-2 text-center">{p.plan.durationDays} ngày</td>

                        {/* ---- Status ---- */}
                        <td className="border px-3 py-2 text-center">
                          <Badge
                            variant={p.isActive ? 'success' : 'destructive'}
                            className="flex items-center gap-1 justify-center"
                          >
                            {p.isActive ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Active
                              </>
                            ) : (
                              'Expired'
                            )}
                          </Badge>
                        </td>

                        {/* ---- Start ---- */}
                        <td className="border px-3 py-2 text-center">
                          {new Date(p.startDate).toLocaleDateString()}
                        </td>

                        {/* ---- End ---- */}
                        <td className="border px-3 py-2 text-center">
                          {new Date(p.endDate).toLocaleDateString()}
                        </td>

                        {/* ---- Actions ---- */}
                        <td className="border px-3 py-2 text-center">
                          <Button size="sm" variant="outline" onClick={() => openDetail(p.plan)}>
                            Chi tiết
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Thông tin gói dịch vụ
            </DialogTitle>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-5 mt-2">
              {/* TÊN GÓI */}
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Package className="w-4 h-4 text-orange-500" />
                  Tên gói
                </p>
                <p className="text-lg font-semibold text-orange-600 mt-1">{selectedPlan.name}</p>
              </div>

              {/* GIÁ + THỜI HẠN */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 border rounded-lg">
                  <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    Giá
                  </p>
                  <p className="text-lg font-semibold text-green-700 mt-1">
                    {selectedPlan.price.toLocaleString('vi-VN')}₫
                  </p>
                </div>

                <div className="p-4 bg-gray-50 border rounded-lg">
                  <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Thời hạn
                  </p>
                  <p className="text-lg font-semibold text-blue-700 mt-1">
                    {selectedPlan.durationDays} ngày
                  </p>
                </div>
              </div>

              {/* FEATURE */}
              <div className="p-4 bg-white border rounded-lg">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-purple-600" />
                  Tính năng bao gồm
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPlan.features.map((f, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full border border-purple-200"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="p-4 bg-gray-50 border rounded-lg">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-600" />
                  Mô tả
                </p>
                <p className="text-gray-600 mt-1">
                  {selectedPlan.description || 'Không có mô tả.'}
                </p>
              </div>

              {/* DATES */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border rounded-lg">
                  <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    Ngày tạo
                  </p>
                  <p className="text-gray-800 font-medium mt-1">
                    {new Date(selectedPlan.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {selectedPlan.updatedAt && (
                  <div className="p-4 bg-white border rounded-lg">
                    <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <History className="w-4 h-4 text-indigo-600" />
                      Cập nhật
                    </p>
                    <p className="text-gray-800 font-medium mt-1">
                      {new Date(selectedPlan.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
