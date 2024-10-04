import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Wrapper from "@/components/Wrapper";
import { BaseProvider } from "@/components/provider";

export const metadata: Metadata = {
  title: "Rivu",
  description: "Fullstack book review project by Judith Yusuf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseProvider>
      <html lang="en">
      <body
        className={`antialiased`}
      > 
        <Navbar />
        <Wrapper>
        {children}
        </Wrapper>
      </body>
    </html>
    </BaseProvider>
  );
}
