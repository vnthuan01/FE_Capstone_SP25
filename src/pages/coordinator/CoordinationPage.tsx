import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Team {
  id: string;
  name: string;
  status: 'moving' | 'arrived' | 'sos';
  distance?: string;
  vehicle: string;
  vehicleType: string;
  time?: string;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Đội Hỗ Trợ 01',
    status: 'moving',
    distance: '5km nữa',
    vehicle: 'Xe tải 2.5T',
    vehicleType: 'local_shipping',
  },
  {
    id: '2',
    name: 'Đội Cứu Hộ 05',
    status: 'sos',
    vehicle: 'Cano cao tốc',
    vehicleType: 'directions_boat',
  },
  {
    id: '3',
    name: 'Đội Y Tế A',
    status: 'arrived',
    time: '10 phút trước',
    vehicle: 'Xe cứu thương',
    vehicleType: 'ambulance',
  },
  {
    id: '4',
    name: 'Đội TNV Sông Hàn',
    status: 'moving',
    distance: '12km nữa',
    vehicle: '15 người',
    vehicleType: 'groups',
  },
];

export default function CoordinationPage() {
  return (
    <DashboardLayout
      projects={[
        { label: 'Tổng quan', path: '/portal/coordinator/dashboard', icon: 'dashboard' },
        { label: 'Điều phối & Bản đồ', path: '/portal/coordinator/maps', icon: 'map' },
        { label: 'Đội tình nguyện', path: '/portal/coordinator/teams', icon: 'groups' },
        {
          label: 'Kho vận & Nhu yếu phẩm',
          path: '/portal/coordinator/inventory',
          icon: 'inventory_2',
        },
      ]}
      navItems={[
        { label: 'Báo cáo & Thống kê', path: '/portal/coordinator/reports', icon: 'description' },
      ]}
      searchPlaceholder="Tìm kiếm địa điểm, đội cứu hộ..."
    >
      {/* Page Header & Stats */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-end mb-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-main-dark dark:text-text-main-light">
            Điều phối hoạt động cứu trợ
          </h1>
          <p className="text-text-sub-dark dark:text-text-sub-light text-lg">
            Khu vực:{' '}
            <span className="text-text-main-dark dark:text-text-main-light font-bold">
              Huyện Lệ Thủy, Quảng Bình
            </span>{' '}
            - Mức độ: <span className="text-red-400 font-bold">Khẩn cấp (Cấp 3)</span>
          </p>
        </div>
        <div className="flex gap-3 mb-5">
          <Button variant="destructive" size="lg" className="shadow-lg shadow-red-900/20">
            <span className="material-symbols-outlined">warning</span>
            <span>Phát cảnh báo SOS</span>
          </Button>
          <Button variant="primary" size="lg" className="shadow-lg shadow-blue-900/20">
            <span className="material-symbols-outlined">add_location_alt</span>
            <span>Tạo nhiệm vụ mới</span>
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-card-dark dark:bg-card-light border border-border/50 shadow-[0_4px_12px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.45)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300">
          {' '}
          <CardContent className="p-5 flex flex-col gap-1">
            <div className="flex justify-between items-start">
              <p className="text-text-sub-dark dark:text-text-sub-light font-medium">
                Đội đang di chuyển
              </p>
              <span className="material-symbols-outlined text-blue-400">directions_car</span>
            </div>
            <p className="text-3xl font-bold text-text-main-dark dark:text-text-main-light">24</p>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span> +3 đội mới
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card-dark dark:bg-card-light border border-border/50 shadow-[0_4px_12px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.45)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300">
          <CardContent className="p-5 flex flex-col gap-1">
            <div className="flex justify-between items-start">
              <p className="text-text-sub-dark dark:text-text-sub-light font-medium">
                Đã đến điểm tập kết
              </p>
              <span className="material-symbols-outlined text-green-400">flag</span>
            </div>
            <p className="text-3xl font-bold text-text-main-dark dark:text-text-main-light">15</p>
            <p className="text-xs text-text-muted-dark dark:text-text-muted-light mt-1">
              Trong 24h qua
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card-dark dark:bg-card-light border border-red-900/30 dark:border-red-500/30 relative overflow-hidden group shadow-[0_6px_18px_rgba(239,68,68,0.35)] dark:shadow-[0_6px_18px_rgba(239,68,68,0.45)] hover:shadow-[0_10px_30px_rgba(239,68,68,0.55)] transition-all duration-300 ">
          {' '}
          <div className="absolute right-4 top-8 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-red-500 text-6xl">sos</span>
          </div>
          <CardContent className="p-5 flex flex-col gap-1 relative z-10">
            <div className="flex justify-between items-start">
              <p className="text-red-500 dark:text-red-300 font-medium">Yêu cầu khẩn cấp </p>
              <span className="material-symbols-outlined text-red-500 animate-pulse">fmd_bad</span>
            </div>
            <p className="text-3xl font-bold text-red-500">3</p>
            <p className="text-xs text-red-400 dark:text-red-300 mt-1">Cần xử lý ngay</p>
          </CardContent>
        </Card>
        <Card className="bg-card-dark dark:bg-card-light border border-border/50 shadow-[0_4px_12px_rgba(0,0,0,0.25)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.45)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300">
          <CardContent className="p-5 flex flex-col gap-1">
            <div className="flex justify-between items-start">
              <p className="text-text-sub-dark dark:text-text-sub-light font-medium">
                Vùng bị cô lập
              </p>
              <span className="material-symbols-outlined text-orange-400">flood</span>
            </div>
            <p className="text-3xl font-bold text-text-main-dark dark:text-text-main-light">05</p>
            <p className="text-xs text-orange-400 mt-1">Mực nước đang dâng</p>
          </CardContent>
        </Card>
      </div>

      {/* Map & Operations Area */}
      <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
        {/* Map Section */}
        <div className="flex-1 bg-surface-dark dark:bg-surface-light rounded-2xl overflow-hidden border border-border relative shadow-2xl flex flex-col">
          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <div className="bg-surface-dark/90 dark:bg-surface-light/90 backdrop-blur text-text-main-dark dark:text-text-main-light p-2 rounded-lg shadow-lg border border-border hover:bg-surface-dark dark:hover:bg-surface-light cursor-pointer">
              <span className="material-symbols-outlined">add</span>
            </div>
            <div className="bg-surface-dark/90 dark:bg-surface-light/90 backdrop-blur text-text-main-dark dark:text-text-main-light p-2 rounded-lg shadow-lg border border-border hover:bg-surface-dark dark:hover:bg-surface-light cursor-pointer">
              <span className="material-symbols-outlined">remove</span>
            </div>
          </div>

          {/* Map Filters */}
          <div className="absolute top-4 right-4 z-20 flex flex-wrap justify-end gap-2 max-w-lg">
            <Button
              variant="ghost"
              size="sm"
              className="bg-surface-dark/90 dark:bg-surface-light/90 backdrop-blur text-text-main-dark dark:text-text-main-light rounded-full shadow-lg border border-border hover:bg-card-dark dark:hover:bg-card-light"
            >
              <span className="material-symbols-outlined text-[18px] text-red-400">water_drop</span>
              Vùng ngập
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-surface-dark/90 dark:bg-surface-light/90 backdrop-blur text-text-main-dark dark:text-text-main-light rounded-full shadow-lg border border-border hover:bg-card-dark dark:hover:bg-card-light"
            >
              <span className="material-symbols-outlined text-[18px] text-green-400">
                local_hospital
              </span>
              Trạm y tế
            </Button>
          </div>

          {/* Map Visualization */}
          <div className="relative w-full h-full bg-background-dark dark:bg-background-light min-h-[500px]">
            {/* Background Map Image */}
            <img
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale"
              alt="Satellite map view of the flooded region in Quang Binh"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCKboXyKDhqWqfE3kwOHZsLglbU4N-wk2SR0yzi3SXiuUczjGcH5AQL7frPHAkZGcUYRg3SdgcJkvlznkxZu_njV9-mf3n2D2NT0Pd3h7Vu7W_GIy5_iJkMjB1QfQiGElSVM4_CdloBHXakHpK5YKKHKr1Wx5wYIz6l4k0MlFEHaJjCjwZKPWueSE6vA9hyQWmRNFFOMOWIHZmv0YmhRVsKSoBhvn26v81KzWYf9_CTw24xdm9OkNuaeMThjWfyr9F4GwO7Hfsvho"
            />

            {/* SVG Overlay for Routes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <filter id="glow">
                  <feGaussianBlur result="coloredBlur" stdDeviation="2.5"></feGaussianBlur>
                  <feMerge>
                    <feMergeNode in="coloredBlur"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>
              {/* Old/Blocked Route (Red dotted) */}
              <path
                d="M 200 400 Q 350 350 500 450 T 700 300"
                fill="none"
                opacity="0.6"
                stroke="#ef4444"
                strokeDasharray="5,5"
                strokeWidth="3"
              ></path>
              {/* AI Suggested Route (Bright Blue Glowing) */}
              <path
                className="animate-route"
                d="M 200 400 C 300 100 550 150 700 300"
                fill="none"
                filter="url(#glow)"
                stroke="#137fec"
                strokeLinecap="round"
              ></path>
              {/* Destination Marker Circle */}
              <circle
                cx="700"
                cy="300"
                fill="rgba(19, 127, 236, 0.2)"
                r="10"
                stroke="#137fec"
                strokeWidth="2"
              >
                <animate
                  attributeName="r"
                  dur="2s"
                  repeatCount="indefinite"
                  values="5;15;5"
                ></animate>
                <animate
                  attributeName="opacity"
                  dur="2s"
                  repeatCount="indefinite"
                  values="1;0;1"
                ></animate>
              </circle>
            </svg>

            {/* Interactive Markers */}
            {/* Volunteer Team 1 (Moving) */}
            <div className="absolute top-[38%] left-[25%] z-20 group cursor-pointer">
              <div className="relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-surface-dark dark:bg-surface-light text-text-main-dark dark:text-text-main-light text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-border shadow-xl pointer-events-none">
                  Đội Hỗ Trợ 01 - Đang di chuyển
                </div>
                <div className="size-8 bg-blue-600 rounded-full border-2 border-white dark:border-gray-200 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <span className="material-symbols-outlined text-white text-[16px]">
                    navigation
                  </span>
                </div>
              </div>
            </div>

            {/* Volunteer Team 2 (SOS) */}
            <div className="absolute top-[65%] left-[55%] z-20 group cursor-pointer">
              <div className="relative">
                {/* <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-900 dark:bg-red-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-100 transition-opacity border border-red-500 shadow-xl font-bold">
                  SOS: Đội Cứu Hộ 05
                </div> */}
                <div className="size-10 bg-red-600 rounded-full border-2 border-white dark:border-gray-200 flex items-center justify-center shadow-lg shadow-red-500/50 animate-bounce">
                  <span className="material-symbols-outlined text-white text-[20px]">warning</span>
                </div>
              </div>
            </div>

            {/* Warehouse */}
            <div className="absolute top-[20%] left-[60%] z-20 group cursor-pointer">
              <div className="size-8 bg-card-dark dark:bg-card-light rounded-lg border-2 border-border flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-text-main-dark dark:text-text-main-light text-[18px]">
                  warehouse
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Info Bar on Map */}
          <div className="absolute bottom-0 left-0 right-0 bg-surface-dark/95 dark:bg-surface-light/95 backdrop-blur border-t border-border p-3 px-6 flex justify-between items-center z-20">
            <div className="flex items-center gap-4 text-sm text-text-sub-dark dark:text-text-sub-light">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-primary rounded-full"></span>
                <span>AI Gợi ý (Nhanh nhất)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-red-500 border-b border-red-500 border-dashed"></span>
                <span>Đường bị chặn/Sạt lở</span>
              </div>
            </div>
            <div className="text-xs text-text-muted-dark dark:text-text-muted-light font-mono">
              Lat: 17.2032 N | Long: 106.6342 E
            </div>
          </div>
        </div>

        {/* Right Sidebar: Contextual Info */}
        <div className="w-full lg:w-96 flex flex-col gap-4 shrink-0">
          {/* AI Suggestion Card */}
          <Card className="py-2 relative overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-50 dark:from-blue-800/30 via-card-light dark:via-card-dark to-card-light dark:to-card-dark shadow-sm dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:dark:shadow-[0_12px_32px_rgba(0,0,0,0.55)] transition-all duration-300">
            {' '}
            <div className="absolute top-0 right-0 p-3 opacity-20">
              <span className="material-symbols-outlined text-6xl text-blue-400">psychology</span>
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="primary" size="sm">
                  AI SYSTEM
                </Badge>
                <span className="text-blue-300 dark:text-blue-400 text-sm font-medium">
                  Đề xuất tối ưu
                </span>
              </div>
              <CardTitle className="text-text-main-dark dark:text-text-main-light text-lg">
                Thay đổi lộ trình: Đội Hỗ Trợ 01
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-sub-dark dark:text-text-sub-light text-sm mb-4">
                Phát hiện mực nước dâng cao tại QL1A đoạn km20. Hệ thống gợi ý chuyển hướng sang
                đường tránh DT602.
              </p>
              <div className="flex items-center gap-3 text-sm mb-4 p-2 rounded border text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-400/20 border-green-200 dark:border-green-400/20">
                <span className="material-symbols-outlined text-[18px] text-green-600 dark:text-green-400">
                  timer
                </span>
                <span>Tiết kiệm dự kiến: 15 phút</span>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" className="flex-1 shadow-lg shadow-blue-900/20">
                  Chấp thuận
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent border-border text-text-sub-dark dark:text-text-sub-light hover:bg-card-dark dark:hover:bg-card"
                >
                  Bỏ qua
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Teams List */}
          <Card className="bg-card-light dark:bg-card-dark border-border flex-1 flex flex-col overflow-hidden max-h-[500px] shadow-sm dark:shadow-lg">
            {/* Header */}
            <CardHeader className="border-b border-border bg-sub-surface-light dark:bg-sub-surface-dark">
              <div className="flex justify-between items-center">
                <CardTitle className="text-text-main-dark dark:text-text-main-light">
                  Đội cứu hộ trực tuyến
                </CardTitle>
                <Badge variant="secondary" size="sm" appearance="outline">
                  12 active
                </Badge>
              </div>
            </CardHeader>

            {/* Body */}
            <ScrollArea className="flex-1 p-2">
              <div className="space-y-2">
                {mockTeams.map((team) => (
                  <div
                    key={team.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      team.status === 'sos'
                        ? `
                bg-red-50 dark:bg-red-900/25
                border-red-300 dark:border-red-500/50
                hover:bg-red-100 dark:hover:bg-red-900/35
              `
                        : `
                bg-surface-light dark:bg-surface-dark
                border-border
                hover:border-primary/50
              `
                    }`}
                  >
                    {/* Top row */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {/* Status dot */}
                        {team.status === 'sos' ? (
                          <div className="relative">
                            <span className="absolute inset-0 rounded-full bg-red-400/40 animate-ping"></span>
                            <span className="relative size-2 rounded-full bg-red-600"></span>
                          </div>
                        ) : (
                          <div
                            className={`size-2 rounded-full ${
                              team.status === 'arrived'
                                ? 'bg-green-500'
                                : 'bg-blue-500 animate-pulse'
                            }`}
                          />
                        )}

                        {/* Team name */}
                        <span
                          className={`font-bold text-sm ${
                            team.status === 'sos'
                              ? 'text-red-700 dark:text-red-300'
                              : 'text-text-main-dark dark:text-text-main-light'
                          }`}
                        >
                          {team.name}
                        </span>
                      </div>

                      {/* Right badge / info */}
                      {team.status === 'sos' ? (
                        <Badge variant="destructive" size="xs">
                          SOS
                        </Badge>
                      ) : team.status === 'arrived' ? (
                        <Badge variant="success" size="xs" appearance="ghost">
                          Đã đến nơi
                        </Badge>
                      ) : (
                        <span className="text-xs font-mono text-text-sub-dark dark:text-text-sub-light">
                          {team.distance}
                        </span>
                      )}
                    </div>

                    {/* SOS message */}
                    {team.status === 'sos' && (
                      <p className="text-xs text-red-600 dark:text-red-400 mb-1">
                        Báo cáo: Kẹt xe do sạt lở
                      </p>
                    )}

                    {/* Bottom row */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-text-sub-dark dark:text-text-sub-light">
                        <span className="material-symbols-outlined text-[14px]">
                          {team.vehicleType}
                        </span>
                        {team.vehicle}
                      </span>

                      {team.status === 'sos' ? (
                        <span className="text-red-600 dark:text-red-500 font-bold">Cần hỗ trợ</span>
                      ) : team.status === 'arrived' ? (
                        <span className="text-text-muted-dark dark:text-text-muted-light">
                          {team.time}
                        </span>
                      ) : (
                        <span className="text-blue-600 dark:text-blue-400 hover:underline">
                          Xem chi tiết →
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
