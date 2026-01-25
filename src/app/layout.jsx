import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import CustomCursor from "../components/common/CustomCursor";

export const metadata = {
  title: "Harman | Portfolio",
  description: "Personal portfolio built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-white">
        {/* <CustomCursor /> */}
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
