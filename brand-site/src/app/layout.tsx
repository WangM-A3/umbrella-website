import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "NEXUS · AI Agent Architect",
  description: "Architecting the Next Generation of Intelligent Agent Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} dark`} suppressHydrationWarning>
      <body className="antialiased">
        <CustomCursor />
        {/* Google Analytics */}

        {/* Schema.org: Organization + WebSite */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"NEXUS","url":"https://www.silicon-army.cn","logo":"https://www.silicon-army.cn/favicon.ico","description":"AI Agent Architect","contactPoint":{"@type":"ContactPoint","telephone":"+86-13336021626","contactType":"sales"}})}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"WebSite","name":"NEXUS - AI Agent Architect","url":"https://www.silicon-army.cn"})}} />
        <script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
{children}</body>
    </html>
  );
}