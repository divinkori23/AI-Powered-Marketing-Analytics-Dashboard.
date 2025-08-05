import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { getMetrics } from '@/lib/data';

export async function MetricsOverview() {
  const metrics = await getMetrics();

  const metricCards = [
    {
      title: 'Total Revenue',
      value: `$${(metrics.revenue / 1000).toFixed(1)}k`,
      change: `+${metrics.revenueChange.toFixed(1)}% from last month`,
      icon: DollarSign,
    },
    {
      title: 'Active Users',
      value: `+${(metrics.users / 1000).toFixed(1)}k`,
      change: `+${metrics.usersChange.toFixed(1)}% from last month`,
      icon: Users,
    },
    {
      title: 'Conversions',
      value: `+${metrics.conversions}`,
      change: `+${metrics.conversionsChange.toFixed(1)}% from last month`,
      icon: CreditCard,
    },
    {
      title: 'Growth Rate',
      value: `+${metrics.growth.toFixed(1)}%`,
      change: 'Trending up',
      icon: Activity,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {metricCards.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
