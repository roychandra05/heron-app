import { Roboto } from "next/font/google";
import "./globals.css";
import UserProvider from "../context/UserContext";
import { Suspense } from "react";
import Loading from "./loading";
import NotifProvider from "@/context/NotifContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Heron Fit",
  description: "Heron Fit App",
  icons: {
    icon: [
      {
        url: "/favicon-heron/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-heron/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/favicon-heron/apple-touch-icon.png",
  },
  manifest: "/favicon-heron/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-main-background `}>
        <UserProvider>
          <NotifProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </NotifProvider>
        </UserProvider>
      </body>
    </html>
  );
}
