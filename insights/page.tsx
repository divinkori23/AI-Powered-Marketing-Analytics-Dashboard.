
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Header } from '@/components/dashboard/header';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { getMetrics } from '@/lib/data';
import { generateInsights, type GenerateInsightsOutput } from '@/ai/flows/generate-insights-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

export default function InsightsPage() {
    const [loading, setLoading] = useState(false);
    const [insights, setInsights] = useState<GenerateInsightsOutput | null>(null);
    const [error, setError] = useState<string | null>(null);


    const handleGenerateInsights = async () => {
        setLoading(true);
        setError(null);
        setInsights(null);
        try {
            const metrics = await getMetrics();
            const result = await generateInsights(metrics);
            setInsights(result);
        } catch (err) {
            setError('Failed to generate insights. Please try again.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Generate actionable insights and recommendations based on your latest marketing data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                    <Button onClick={handleGenerateInsights} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Insights'}
                    </Button>

                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {loading && (
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                             <Skeleton className="h-6 w-1/4 mt-4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    )}

                    {insights && (
                        <div className="space-y-6">
                            <Alert>
                                <Lightbulb className="h-4 w-4" />
                                <AlertTitle>Key Summary</AlertTitle>
                                <AlertDescription>
                                    <p className="leading-relaxed">{insights.summary}</p>
                                </AlertDescription>
                            </Alert>
                            
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                                <ul className="list-disc space-y-2 pl-5">
                                    {insights.recommendations.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
