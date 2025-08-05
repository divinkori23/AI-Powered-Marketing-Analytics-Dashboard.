
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp, TrendingDown, CircleDollarSign, Percent, MousePointerClick } from 'lucide-react';
import { getKpiData } from '@/lib/data';

function formatChange(change: number) {
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
}

export async function KpiCards() {
  const kpis = await getKpiData();

  const kpiCards = [
    {
      title: 'Click-Through Rate (CTR)',
      value: `${kpis.ctr.toFixed(2)}%`,
      change: formatChange(kpis.ctrChange),
      changeType: kpis.ctrChange > 0 ? 'increase' : 'decrease',
      icon: Percent,
    },
    {
      title: 'Cost Per Click (CPC)',
      value: `$${kpis.cpc.toFixed(2)}`,
      change: formatChange(kpis.cpcChange),
      changeType: kpis.cpcChange > 0 ? 'decrease' : 'increase', // Lower CPC is better
      icon: MousePointerClick,
    },
    {
      title: 'Return on Ad Spend (ROAS)',
      value: `${kpis.roas.toFixed(2)}x`,
      change: formatChange(kpis.roasChange),
      changeType: kpis.roasChange > 0 ? 'increase' : 'decrease',
      icon: CircleDollarSign,
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {kpiCards.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className={kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
                    {kpi.changeType === 'increase' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </span>
                {kpi.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
