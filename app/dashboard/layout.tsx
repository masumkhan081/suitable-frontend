import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { OverviewCards } from '@/components/dashboard/OverviewCards';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
        <OverviewCards />
      </div>
      {children}
    </DashboardLayout>
  );
}
