import type { Metadata } from "next";
import { Inter, Manrope, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
