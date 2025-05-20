import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import HamburgerMenu from "../components/HamburgerMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "El Bucle",
  description: "Hoja para la gestión de personajes del libroj-juego 'El Bucle'",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="p-4 flex justify-end">
          <HamburgerMenu />
        </header>
        <main>
          {children}
        </main>

        <SpeedInsights />
        <Analytics/>
      </body>
    </html>
  );
}
