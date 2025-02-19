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
    icon: "/images/heron-logo.jpg"
  }
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
