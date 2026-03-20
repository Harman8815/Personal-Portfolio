import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../hooks/useTheme";
import CustomCursor from "../components/common/CustomCursor";
import { QueryClientProvider } from "../providers/QueryClientProvider";

export const metadata = {
  title: "Harman | Portfolio",
  description: "Personal portfolio built with Next.js",
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
