import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ReportsTrendChart, WasteTypeChart } from "@/components/dashboard/Charts";
import { RecentReports } from "@/components/dashboard/RecentReports";
import { HotspotMap } from "@/components/map/HotspotMap";
import { mockStats } from "@/data/mockData";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Trash2, 
  Clock,
  LayoutDashboard
} from "lucide-react";

export default function Dashboard() {
  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Monitor e-waste reports, hotspots, and cleanup operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Total Reports"
            value={mockStats.totalReports}
            icon={FileText}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Verified"
            value={mockStats.verifiedReports}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Rejected"
            value={mockStats.rejectedReports}
            icon={XCircle}
            variant="destructive"
          />
          <StatCard
            title="Active Hotspots"
            value={mockStats.activeHotspots}
            icon={MapPin}
            variant="warning"
          />
          <StatCard
            title="Cleaned"
            value={mockStats.cleanedLocations}
            icon={Trash2}
            variant="success"
          />
          <StatCard
            title="Pending"
            value={mockStats.pendingReports}
            icon={Clock}
            variant="warning"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <ReportsTrendChart />
          <WasteTypeChart />
        </div>

        {/* Map and Recent Reports */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HotspotMap />
          </div>
          <RecentReports />
        </div>
      </div>
    </Layout>
  );
}
