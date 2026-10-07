import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shree Rajendra Creation | Vegan Touch — 100% Non-Leather Belts & Wallets",
  description:
    "100% non-leather belts and wallets combining style, comfort, and cruelty-free living. Belts, wallets, card holders and gift combo boxes. Pan-India delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
