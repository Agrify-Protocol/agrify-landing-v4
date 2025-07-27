import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import { inter, pangaia, suisse } from "../fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home - Agrify",
  description:
    "Helping Farmers improve yield, access debt-free finance, and qualify for international exports.",
  openGraph: {
    title: "Home - Agrify",
    description:
      "Improve the Traceability of Your Food Product with Regenerative Intelligence",
    images: [
      {
        url: "https://i.imgur.com/s73EgkU.jpeg",
        alt: "Agrify helping farmers improve yield",
        width: 1280,
        height: 672,
      },
    ],
    locale: "en_US",
    type: "website",
    url: "https://agrifyafrica.xyz/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home - Agrify",
    description:
      "Improve the Traceability of Your Food Product with Regenerative Intelligence",
    images: "https://i.imgur.com/s73EgkU.jpeg",
    creator: "@agrifyafrica",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${inter.variable} ${pangaia.variable} ${suisse.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
