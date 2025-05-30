"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip"; // Assuming @/ maps to nextjs_src_final/
import { Toaster as RadixToaster } from "@/components/ui/toaster"; // Renaming to avoid conflict if Sonner is also named Toaster
import { Toaster as Sonner } from "@/components/ui/sonner";

// It's good practice to create the queryClient instance only once.
// For Next.js App Router, if you need to share this across server components or for SSR,
// you might need a more advanced setup, but for client-side only, this is fine.
// Given no Supabase/API, this might be simplified later.
// const queryClient = new QueryClient(); // Creating instance inside component to ensure it's client-side

export function Providers({ children }: { children: React.ReactNode }) {
  // Next.js 13+ App Router best practice: Create queryClient inside the component or provide it.
  // This ensures a new client for each request on the server, preventing data leaks.
  // For client components, useState ensures it's created once per client.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <RadixToaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
