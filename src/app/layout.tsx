import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { LocationProvider } from "@/lib/location/LocationProvider";
import { env } from "@/lib/env";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const siteUrl = env.siteUrl;
const title = "Servora — Find the right service. Right when you need it.";
const description =
  "Discover trusted local professionals, compare your options, and book in minutes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Servora",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-16 lg:pb-0">
        <ToastProvider>
          <AuthProvider>
            <LocationProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <BottomTabBar />
            </LocationProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
