import type { Metadata } from "next";
import "./globals.css";
import  { UserProvider } from "./context";
import { Navigation } from "@mui/icons-material";



export const metadata: Metadata = {
  title: "Cybersoft Bank App",
  description: "Your application for making all transactions in your bank account",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body >
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
