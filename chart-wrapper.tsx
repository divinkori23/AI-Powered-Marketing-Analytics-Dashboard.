
"use client";

// Recharts components are not yet ready for 'use client' directives.
// This wrapper component allows us to use them in a client-side context.
// See: https://github.com/recharts/recharts/issues/3615
export function ChartWrapper({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
