import "./globals.css";

export const metadata = {
  title: "Harman | Portfolio",
  description: "Personal portfolio built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-white">{children}</body>
    </html>
  );
}
