"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const ReactQueryProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
};