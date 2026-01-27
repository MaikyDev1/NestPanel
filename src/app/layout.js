import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "NestPanel",
  description: "A home control solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/src/app/manifest.json" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none touch-none`}>
        <main className="bg-neutral-700 flex flex-col justify-center items-center h-screen w-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
