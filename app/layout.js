import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { Navbar } from "@/app/components/layout/NavBar";
import "./globals.css";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Apex Dynasty Hub",
  description: "The hub for the Apex Dynasty Fantasy Football league",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Apex Dynasty Hub",
    description: "The hub for the Apex Dynasty Fantasy Football league",
    url: "https://apexdynastyhub.com",
    siteName: "Apex Dynasty Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Dynasty Hub",
    description: "The hub for the Apex Dynasty Fantasy Football league",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: "yes",
    statusBarStyle: "default",
    title: "Apex Dynasty Hub",
    startupImage: "/apple-touch-startup-image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="container mx-auto">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
