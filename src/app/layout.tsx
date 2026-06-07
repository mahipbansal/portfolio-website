import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahip-bansal.vercel.app"),
  title: "Mahip Bansal — Portfolio",
  description: "Computer Science student and builder turning ideas into real, working products. Explore featured AI projects, interactive bot, tech stack, and schedule a meeting.",
  keywords: ["Mahip Bansal", "Portfolio", "Computer Science", "AI Engineer", "Software Developer", "LinkLift", "Next.js", "TypeScript"],
  authors: [{ name: "Mahip Bansal" }],
  openGraph: {
    title: "Mahip Bansal — Portfolio",
    description: "Computer Science student and builder turning ideas into real, working products. Explore featured AI projects, interactive bot, tech stack, and schedule a meeting.",
    url: "https://mahip-bansal.vercel.app",
    siteName: "Mahip Bansal Portfolio",
    images: [
      {
        url: "/mahip-cutout.png",
        width: 1200,
        height: 630,
        alt: "Mahip Bansal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahip Bansal — Portfolio",
    description: "Computer Science student and builder turning ideas into real, working products. Explore featured AI projects, interactive bot, tech stack, and schedule a meeting.",
    images: ["/mahip-cutout.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full bg-[#050505] overflow-x-hidden overflow-y-auto font-sans">{children}</body>
    </html>
  );
}
