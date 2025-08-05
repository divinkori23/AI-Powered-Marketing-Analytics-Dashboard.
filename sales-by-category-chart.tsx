
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

type SalesData = {
  category: string;
  sales: number;
};

export function SalesByCategoryChart({ data }: { data: SalesData[] }) {
    const chartConfig = {
        sales: {
        label: 'Sales',
        color: 'hsl(var(--primary))',
        },
    };

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart 
        accessibilityLayer
        data={data} 
        layout="vertical"
        margin={{
          right: 10,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="category"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <XAxis dataKey="sales" type="number" hide />
        <Tooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="sales" layout="vertical" radius={5} fill="var(--color-sales)" />
      </BarChart>
    </ChartContainer>
  );
}
