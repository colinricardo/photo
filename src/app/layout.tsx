import { TRPCReactProvider } from "@/trpc/react";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Inter as FontSans } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
import TailwindIndicator from "@/frontend/components/common/TailwindIndicator";
import ActiveModals from "@/frontend/components/modals/ActiveModals";
import { JotaiProvider } from "@/frontend/lib/jotai-provider";
import { cn } from "@/frontend/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ThemeProvider from "@/frontend/lib/theme-provider";
import { APP_NAME } from "@/frontend/config";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TRPCReactProvider>
              <JotaiProvider>
                <TooltipProvider>{children}</TooltipProvider>
                <ActiveModals />
              </JotaiProvider>
            </TRPCReactProvider>
          </ThemeProvider>
          <TailwindIndicator />

          <div className="absolute bottom-0 right-0">
            <Toaster richColors position="bottom-left" />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
};
