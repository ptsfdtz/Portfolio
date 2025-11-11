import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "./components";
import ThemeProviderWrapper from "./utils/theme";
import styles from "./layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "个人网站 - tuzi的主页",
  description:
    "欢迎来到tuzi的个人网站！在这里你可以了解我的教育背景、工作经历、个人技能和项目经验。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${styles.root}`}
      >
        <ThemeProviderWrapper>
          <Header />
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
