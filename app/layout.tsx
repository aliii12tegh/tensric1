import type { Metadata } from "next";
import "./globals.css";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Tensric | AI Image Upscaling",
  description: "Transform Pixels Into Perfection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
