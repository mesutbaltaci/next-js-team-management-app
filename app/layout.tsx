import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./provider/AuthProvider";

export const metadata: Metadata = {
  title: "Team Access Control",
  description: "Role based access control system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <AuthProvider>{children} </AuthProvider>
      </body>
    </html>
  );
}
