
"use server";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getConversionRateData } from '@/lib/data';
import { ChartWrapper } from './chart-wrapper';

export async function ConversionRateChart() {
  const data = await getConversionRateData();

  const chartConfig = {
    rate: {
      label: 'Rate (%)',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <ChartWrapper>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
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
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <defs>
              <linearGradient id="fillRate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-rate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-rate)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="rate"
              type="monotone"
              fill="url(#fillRate)"
              stroke="var(--color-rate)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
    </ChartWrapper>
  );
}
