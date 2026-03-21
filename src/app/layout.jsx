import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../hooks/useTheme";
import CustomCursor from "../components/common/CustomCursor";
import { QueryClientProvider } from "../providers/QueryClientProvider";

export const metadata = {
  title: "Harman | Full Stack Developer & Creative Technologist",
  description: "Portfolio of Harman, a Full Stack Developer specializing in React, Next.js, Three.js, and modern web technologies. Explore projects, achievements, and technical expertise.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Three.js", "Web Development", "Portfolio"],
  authors: [{ name: "Harman" }],
  creator: "Harman",
  metadataBase: new URL("https://harmandevexp.netlify.app/"),
  openGraph: {
    title: "Harman | Full Stack Developer Portfolio",
    description: "Personal portfolio showcasing projects, achievements, and technical expertise.",
    url: "https://harmandevexp.netlify.app/",
    siteName: "Harman Portfolio",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Portfolio Logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harman | Full Stack Developer Portfolio",
    description: "Personal portfolio showcasing projects and technical expertise.",
    images: ["/logo.svg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.svg", shortcut: "/logo.svg", apple: "/logo.svg" },
};

export const viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#020617" }],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-primary">
        <QueryClientProvider>
          <ThemeProvider>
            <CustomCursor />
            <Navbar />
            <main className="">{children}</main>
            <Footer />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
