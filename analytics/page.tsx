
import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Header } from '@/components/dashboard/header';
import { AppSidebar } from '@/components/app-sidebar';
import { ChartSkeleton } from '@/components/skeletons/chart-skeleton';
import { KpiCards } from '@/components/analytics/kpi-cards';
import { UserGrowthChart } from '@/components/analytics/user-growth-chart';
import { ConversionRateChart } from '@/components/analytics/conversion-rate-chart';
import { CardSkeleton } from '@/components/skeletons/card-skeleton';

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Deep dive into your performance metrics.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Suspense fallback={
                <div className="grid gap-4 md:grid-cols-3">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            }>
                <KpiCards />
            </Suspense>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth Over Time</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Suspense fallback={<ChartSkeleton />}>
                    <UserGrowthChart />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rate Trend</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Suspense fallback={<ChartSkeleton />}>
                    <ConversionRateChart />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
        </main>
      </div>
    </div>
  );
}
