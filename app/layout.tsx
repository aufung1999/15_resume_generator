import Provider from "@/context/AuthContext";
import "./globals.css";
import { Inter, Pacifico } from "next/font/google";
import Header from "@/components/RootLayout/Header";

import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <Providers>
          <body className=" min-h-screen border-0 border-blue-300">
            <div
              className={
                inter.className +
                " relative flex flex-col h-full border-8 border-[#102C57]"
              }
            >
              {/* Header */}
              <div className="w-full border-0 border-red-300">
                <Header />
              </div>
              {/* Body */}
              <div className="h-full border-0 border-red-300">{children}</div>
            </div>
          </body>
        </Providers>
      </Provider>
    </html>
  );
}
