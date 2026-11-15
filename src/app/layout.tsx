import "./admissions/admissions.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./premium.css";
import "./editorial.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Future Minds | Coaching Center",
  description: "Future Minds Coaching Center — school tuition for classes 6–12, CBSE, ICSE and Matriculation, NEET and JEE preparation, and engineering education.",
  icons: { icon: "/branding/fm-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full flex flex-col"><SiteHeader />{children}<SiteFooter /></body></html>;
}
