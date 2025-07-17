import type { Metadata } from "next";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";
import Provider from "./Provider";

export const metadata: Metadata = {
  title: "Castle Datastore",
  description: "日本の城の情報をまとめたサイトです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
