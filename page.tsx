import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Header } from '@/components/dashboard/header';
import { MetricsOverview } from '@/components/dashboard/metrics-overview';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { SalesByCategoryChart } from '@/components/dashboard/sales-by-category-chart';
import { DataTableWrapper } from '@/components/dashboard/data-table-wrapper';
import { CardSkeleton } from '@/components/skeletons/card-skeleton';
import { ChartSkeleton } from '@/components/skeletons/chart-skeleton';
import { TableSkeleton } from '@/components/skeletons/table-skeleton';
import { AppSidebar } from '@/components/app-sidebar';
import { getRevenueData, getSalesByCategoryData } from '@/lib/data';

export default async function Home() {
  const revenueData = await getRevenueData();
  const salesByCategoryData = await getSalesByCategoryData();

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Suspense
            fallback={
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            }
          >
            <MetricsOverview />
          </Suspense>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>A summary of your revenue over the last 7 months.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<ChartSkeleton />}>
                  <RevenueChart data={revenueData} />
                </Suspense>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                 <CardDescription>A breakdown of sales by product category.</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<ChartSkeleton />}>
                  <SalesByCategoryChart data={salesByCategoryData} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>A list of the most recent transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<TableSkeleton />}>
                <DataTableWrapper />
              </Suspense>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
