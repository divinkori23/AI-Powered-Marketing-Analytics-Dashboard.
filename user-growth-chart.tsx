
"use server";

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getUserGrowthData } from '@/lib/data';
import { ChartWrapper } from './chart-wrapper';

export async function UserGrowthChart() {
  const data = await getUserGrowthData();

  const chartConfig = {
    users: {
      label: 'Users',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <ChartWrapper>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="users"
              type="monotone"
              stroke="var(--color-users)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
    </ChartWrapper>
  );
}
