import type { Metadata } from "next";
import "./globals.css";
import AuthBar from "./_lib/AuthBar";

export const metadata: Metadata = {
  title: "Tiffany Horimoto",
  description: "Personal site of Tiffany Horimoto, a junior at UH Manoa studying SLS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthBar />
        {children}
      </body>
    </html>
  );
}
