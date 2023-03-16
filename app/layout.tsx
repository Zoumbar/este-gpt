import "./globals.css";
import { AppProviders } from "./providers";

export const metadata = {
  title: "ESTE GPT",
  description: "Rencontrez mon Alfred perso, le serviteur de la nation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <AppProviders>
        <body className="dark:bg-gray-800 dark:text-white bg-gray-50 text-black h-full">
          {children}
        </body>
      </AppProviders>
    </html>
  );
}
